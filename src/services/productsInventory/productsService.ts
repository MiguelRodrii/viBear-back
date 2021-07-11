import { pool as db } from "../../db/connection.ts";
import { KnownError } from "../../utilities/KnownError.ts";
import {
  CONNECTION_REFUSED,
  DUPLICATE,
} from "../../constants/databaseKeywords.ts";
import {
  DB_INACTIVE_EN,
  NON_REGISTERED_EN,
} from "../../constants/exceptions.ts";
import { PRODUCT_ALREADY_CREATED_EN } from "../../constants/productsInventory/products/exceptions.ts";
import { PRODUCT_EN } from "../../constants/productsInventory/products/keywords.ts";

export const findAll = async () => {
  try {
    const result = await db.query(
      "select p.* from products_inventory.products p order by p.modified_at desc",
    );
    return result.rows;
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

export const findAvailable = async () => {
  try {
    const result = await db.query(
      "select p.* from products_inventory.products p, products_inventory.expiration_dates ed where p.id = ed.product_id and ed.value >= current_date and p.current_amount > 0 UNION select p.* from products_inventory.products p, products_inventory.product_definitions pd, products_inventory.product_types pt where p.product_definition_id = pd.id and pd.product_type_id = pt.id and pt.is_expirable = false and p.current_amount > 0 order by modified_at desc;",
    );
    return result.rows;
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

export const findExpired = async () => {
  try {
    const result = await db.query(
      "select p.* from products_inventory.products p, products_inventory.expiration_dates ed where p.id = ed.product_id and ed.value < current_date and p.current_amount > 0 order by p.modified_at desc;",
    );
    return result.rows;
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
  purchase_price: number,
  sale_price: number,
  initial_amount: number,
  current_amount: number,
  product_definition_id: number,
) => {
  try {
    const result = await db.query(
      `insert into products_inventory.products (initial_amount, current_amount, purchase_price, sale_price, product_definition_id) values 
      (${initial_amount}, ${current_amount}, ${purchase_price}, ${sale_price}, ${product_definition_id}) returning *;`,
    );
    return result.rowCount === 0 ? null : result.rows[0];
  } catch (error) {
    if (
      error.message.toLowerCase().includes(DUPLICATE)
    ) {
      throw new KnownError({
        nontechnical: PRODUCT_ALREADY_CREATED_EN,
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
      `select p.* from products_inventory.products p where p.id = ${id};`,
    );
    if (result.rowCount === 0) {
      throw new KnownError({
        nontechnical: PRODUCT_EN + ":" + id + NON_REGISTERED_EN,
        technical: PRODUCT_EN + ":" + id + NON_REGISTERED_EN,
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
    purchase_price: number,
    sale_price: number,
    initial_amount: number,
    current_amount: number,
    product_definition_id: number,
  ) => {
    const previousValue = await findOneById(id);
    try {
      const result = await db.query(
        `update products_inventory.products set initial_amount = ${
          initial_amount === undefined
            ? previousValue.rows[0].initial_amount
            : initial_amount
        }, current_amount = ${
          current_amount === undefined
            ? previousValue.rows[0].current_amount
            : current_amount
        }, purchase_price = ${
          purchase_price === undefined
            ? previousValue.rows[0].purchase_price
            : purchase_price
        }, sale_price = ${
          sale_price === undefined
            ? previousValue.rows[0].sale_price
            : sale_price
        }, product_definition_id = ${
          product_definition_id === undefined
            ? previousValue.rows[0].product_definition_id
            : product_definition_id
        }, modified_at = now() 
        where id = ${id} returning *;`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    } catch (error) {
      if (
        error.message.toLowerCase().includes(DUPLICATE)
      ) {
        throw new KnownError({
          nontechnical: PRODUCT_ALREADY_CREATED_EN,
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
      `delete from products_inventory.products where id = ${id};`,
    );
    return true;
  } catch {
    return false;
  }
};
