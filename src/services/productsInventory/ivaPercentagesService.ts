import { pool as db } from "../../db/connection.ts";
import { KnownError } from "../../utilities/KnownError.ts";
import {
  DB_INACTIVE_EN,
  NON_REGISTERED_EN,
} from "../../constants/exceptions.ts";
import { IVA_PERCENTAGE_EN } from "../../constants/productsInventory/ivaPercentages/keywords.ts";

export const findAll = async () => {
  try {
    const result = await db.query(
      "select ip.* from products_inventory.iva_percentages ip order by ip.modified_at desc;",
    );
    return result.rows;
  } catch (error) {
    throw new KnownError({
      technical: error.message,
      nontechnical: DB_INACTIVE_EN,
    });
  }
};

export const findOneById = async (id: number) => {
  try {
    const result = await db.query(
      `select ip.* from products_inventory.iva_percentages ip where ip.id = ${id};`,
    );
    if (result.rowCount === 0) {
      throw new KnownError({
        nontechnical: IVA_PERCENTAGE_EN + ":" + id + NON_REGISTERED_EN,
        technical: IVA_PERCENTAGE_EN + ":" + id + NON_REGISTERED_EN,
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
