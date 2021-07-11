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
import { EXPIRATION_DATE_ALREADY_CREATED_EN } from "../../constants/productsInventory/expirationDates/exceptions.ts";
import { EXPIRATION_DATE_EN } from "../../constants/productsInventory/expirationDates/keywords.ts";

export const findAll = async () => {
  try {
    const result = await db.query(
      "select * from products_inventory.expiration_dates order by updated_at desc",
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
  value: Date,
  product_id: number,
) => {
  try {
    const result = await db.query(
      `insert into products_inventory.expiration_dates (value, product_id) values ('${value}', ${product_id}) returning *;`,
    );
    return result.rowCount === 0 ? null : result.rows[0];
  } catch (error) {
    if (
      error.message.toLowerCase().includes(DUPLICATE)
    ) {
      throw new KnownError({
        nontechnical: EXPIRATION_DATE_ALREADY_CREATED_EN,
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

const findOneById = async (id: number) => {
  try {
    const result = await db.query(
      `select ed.* from products_inventory.expiration_dates ed where ed.id = ${id};`,
    );
    if (result.rowCount === 0) {
      throw new KnownError({
        nontechnical: EXPIRATION_DATE_EN + ":" + id + NON_REGISTERED_EN,
        technical: EXPIRATION_DATE_EN + ":" + id + NON_REGISTERED_EN,
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
    value: Date,
    product_id: number,
  ) => {
    const previousValue = await findOneById(id);
    try {
      const result = await db.query(
        `update products_inventory.expiration_dates set value = '${
          value === undefined ? previousValue.rows[0].value : value
        }', product_id = ${
          product_id === undefined
            ? previousValue.rows[0].product_id
            : product_id
        }, updated_at = now()
        where id = ${id} returning *;`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    } catch (error) {
      if (
        error.message.toLowerCase().includes(DUPLICATE)
      ) {
        throw new KnownError({
          nontechnical: EXPIRATION_DATE_ALREADY_CREATED_EN,
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
      `delete from products_inventory.expiration_dates where id = ${id};`,
    );
    return true;
  } catch {
    return false;
  }
};
