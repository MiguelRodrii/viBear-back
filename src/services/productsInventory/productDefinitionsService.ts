import { pool as db } from "../../db/connection.ts";
import { KnownError } from "../../utilities/KnownError.ts";
import {
  DB_INACTIVE_EN,
  NON_REGISTERED_EN,
} from "../../constants/exceptions.ts";
import {
  CONNECTION_REFUSED,
  DUPLICATE,
} from "../../constants/databaseKeywords.ts";
import { PRODUCT_DEFINITION_ALREADY_CREATED_EN } from "../../constants/productsInventory/productDefinitions/exceptions.ts";
import { PRODUCT_DEFINITIONS_EN } from "../../constants/productsInventory/productDefinitions/keywords.ts";

export const findAll = async () => {
  try {
    const response = await db.query(
      "select pd.* from products_inventory.product_definitions pd order by pd.modified_at desc;",
    );
    return response.rows;
  } catch (error) {
    if (error.message.toLowerCase().includes(CONNECTION_REFUSED)) {
      throw new KnownError({
        technical: error.message,
        nontechnical: DB_INACTIVE_EN,
      });
    }
    throw error;
  }
};

export const createOne = async (
  name: string,
  description: string,
  product_type_id: number,
) => {
  try {
    const result = await db.query(
      `insert into products_inventory.product_definitions ("name", description, product_type_id) values ('${name}', '${description}', ${product_type_id}) returning *;
    `,
    );
    return result.rowCount === 0 ? null : result.rows[0];
  } catch (error) {
    if (
      error.message.toLowerCase().includes(DUPLICATE)
    ) {
      throw new KnownError({
        nontechnical: PRODUCT_DEFINITION_ALREADY_CREATED_EN,
        technical: error.message,
      });
    }
    if (error.message.toLowerCase().includes(CONNECTION_REFUSED)) {
      throw new KnownError({
        technical: error.message,
        nontechnical: DB_INACTIVE_EN,
      });
    }
    throw error;
  }
};

export const findOneById = async (id: number) => {
  try {
    const result = await db.query(
      `select pd.* from products_inventory.product_definitions pd where pd.id = ${id};`,
    );
    if (result.rowCount === 0) {
      throw new KnownError({
        nontechnical: PRODUCT_DEFINITIONS_EN + ":" + id + NON_REGISTERED_EN,
        technical: PRODUCT_DEFINITIONS_EN + ":" + id + NON_REGISTERED_EN,
      });
    } else {
      return result.rows[0];
    }
  } catch (error) {
    if (error.message.toLowerCase().includes(CONNECTION_REFUSED)) {
      throw new KnownError({
        technical: error.message,
        nontechnical: DB_INACTIVE_EN,
      });
    }
    throw error;
  }
};

export const updateOneById = (id: number) => {
  return async (
    name: string,
    description: string,
    product_type_id: number,
  ) => {
    const previousValue = await findOneById(id);
    try {
      const result = await db.query(
        `update products_inventory.product_definitions set "name" = '${
          name === undefined ? previousValue.rows[0].name : name
        }', description = '${
          description === undefined
            ? previousValue.rows[0].description
            : description
        }', product_type_id = ${
          product_type_id === undefined
            ? previousValue.rows[0].product_type_id
            : product_type_id
        }, modified_at = now() 
        where id = ${id} returning *;`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    } catch (error) {
      if (
        error.message.toLowerCase().includes(DUPLICATE)
      ) {
        throw new KnownError({
          nontechnical: PRODUCT_DEFINITION_ALREADY_CREATED_EN,
          technical: error.message,
        });
      }
      if (error.message.toLowerCase().includes(CONNECTION_REFUSED)) {
        throw new KnownError({
          technical: error.message,
          nontechnical: DB_INACTIVE_EN,
        });
      }
      throw error;
    }
  };
};

export const deleteOneById = async (id: number) => {
  try {
    await db.query(
      `delete from products_inventory.product_definitions where id = ${id};`,
    );
    return true;
  } catch {
    return false;
  }
};
