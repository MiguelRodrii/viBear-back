import { pool as db } from "../../db/connection.ts";
import { KnownError } from "../../utilities/KnownError.ts";
import {
  DB_INACTIVE_EN,
  NAME_IS_DUPLICATED_EN,
  NON_REGISTERED_EN,
} from "../../constants/exceptions.ts";
import { DUPLICATE } from "../../constants/databaseKeywords.ts";
import {
  PRODUCT_TYPES_EN,
  PRODUCT_TYPES_NAME_KEY,
} from "../../constants/productsInventory/productTypes/keywords.ts";

export const findAll = async () => {
  try {
    const result = await db.query(
      "select pt.* from products_inventory.product_types pt order by pt.modified_at desc;",
    );
    return result.rows;
  } catch (error) {
    throw new KnownError({
      nontechnical: DB_INACTIVE_EN,
      technical: error.message,
    });
  }
};

export const createOne = async (
  name: string,
  is_expirable: boolean,
  iva_percentage_id: number,
) => {
  try {
    const result = await db.query(
      `insert into products_inventory.product_types ("name", is_expirable, iva_percentage_id) values ('${name}', ${is_expirable}, ${iva_percentage_id}) returning *;
      `,
    );
    return result.rowCount === 0 ? null : result.rows[0];
  } catch (error) {
    if (
      error.message.toLowerCase().includes(DUPLICATE) &&
      error.message.toLowerCase().includes(PRODUCT_TYPES_NAME_KEY)
    ) {
      throw new KnownError({
        nontechnical: NAME_IS_DUPLICATED_EN,
        technical: error.message,
      });
    }
    throw new KnownError({
      nontechnical: DB_INACTIVE_EN,
      technical: error.message,
    });
  }
};

const findOneById = async (id: number) => {
  try {
    const result = await db.query(
      `select pt.* from products_inventory.product_types pt where pt.id = ${id};`,
    );
    if (result.rowCount === 0) {
      throw new KnownError({
        nontechnical: PRODUCT_TYPES_EN + ":" + id + NON_REGISTERED_EN,
        technical: PRODUCT_TYPES_EN + ":" + id + NON_REGISTERED_EN,
      });
    } else {
      return result.rows[0];
    }
  } catch (error) {
    throw new KnownError({
      nontechnical: DB_INACTIVE_EN,
      technical: error.message,
    });
  }
};

export const updateOneById = (id: number) => {
  return async (
    name: string,
    is_expirable: boolean,
    iva_percentage_id: number,
  ) => {
    const previousValue = await findOneById(id);
    try {
      const result = await db.query(
        `update products_inventory.product_types set "name" = '${
          name === undefined ? previousValue.name : name
        }', is_expirable = ${
          is_expirable === undefined ? previousValue.is_expirable : is_expirable
        }, iva_percentage_id = ${
          iva_percentage_id === undefined
            ? previousValue.iva_percentage_id
            : iva_percentage_id
        },
  
         where id = ${id} returning *;`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    } catch (error) {
      if (
        error.message.toLowerCase().includes(DUPLICATE) &&
        error.message.toLowerCase().includes(PRODUCT_TYPES_NAME_KEY)
      ) {
        throw new KnownError({
          nontechnical: NAME_IS_DUPLICATED_EN,
          technical: error.message,
        });
      }
      throw new KnownError({
        nontechnical: DB_INACTIVE_EN,
        technical: error.message,
      });
    }
  };
};

export const deleteOneById = async (id: number) => {
  await db.query(
    `delete from products_inventory.product_types where id = ${id};`,
  );
};
