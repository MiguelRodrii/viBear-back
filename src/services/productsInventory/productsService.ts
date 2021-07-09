import { pool as db } from "../../db/connection.ts";

export const findAll = async () => {
  try {
    const result = await db.query(
      "select * from products_inventory.products order by id desc",
    );
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findAvailable = async () => {
  try {
    const result = await db.query(
      "select p.* from products_inventory.products p, products_inventory.expiration_dates ed where p.id = ed.product_id and ed.value >= current_date and p.current_amount > 0 UNION select p.* from products_inventory.products p, products_inventory.product_definitions pd, products_inventory.product_types pt where p.product_definition_id = pd.id and pd.product_type_id = pt.id and pt.is_expirable = false and p.current_amount > 0 order by id desc;",
    );
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findExpired = async () => {
  try {
    const result = await db.query(
      "select p.* from products_inventory.products p, products_inventory.expiration_dates ed where p.id = ed.product_id and ed.value < current_date and p.current_amount > 0 order by p.id desc;",
    );
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};
