import { client as db } from "../../../db/connection.ts";

const productDefinitionsResolver = {
  Query: {
    productDefinitions: async () => {
      const result = await db.query("select * from products_inventory.product_definitions");
      return result.rows;
    },
  },
};

export default productDefinitionsResolver;
