import { client as db } from "../../../db/connection.ts";

const productsResolver = {
  Query: {
    products: async () => {
      const result = await db.query(
        "select * from products_inventory.products",
      );
      return result.rows;
    }
  }
};

export default productsResolver;
