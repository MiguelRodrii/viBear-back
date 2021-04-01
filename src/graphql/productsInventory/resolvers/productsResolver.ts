import { client as db } from "../../../db/connection.ts";

const productsResolver = {
  Query: {
    ivaPercentages: async () => {
      const result = await db.query(
        "select * from products_inventory.iva_percentages",
      );
      return result.rows;
    },
    productTypes: async () => {
      const result = await db.query(
        "select * from products_inventory.product_types",
      );
      return result.rows;
    },
    productDefinitions: async () => {
      const result = await db.query(
        "select * from products_inventory.product_definitions",
      );
      return result.rows;
    },
    products: async () => {
      const result = await db.query(
        "select * from products_inventory.products",
      );
      return result.rows;
    },
    expirationDates: async () => {
      const result = await db.query(
        "select * from products_inventory.expiration_dates",
      );
      return result.rows;
    },
  },
  ProductType: {
    iva_percentage: async (productType: { iva_percentage_id: number; }) => {
      const result = await db.query(`select ip.* from products_inventory.iva_percentages ip, products_inventory.product_types pt where ip.id = ${productType.iva_percentage_id};`);
      return result.rowCount === 0 ? [] : result.rows[0];
    }
  },
  ProductDefinition: {
    product_type: async (productDefinition: { product_type_id: number; }) => {
      const result = await db.query(`select pt.* from products_inventory.product_types pt, products_inventory.product_definitions pd where pt.id = ${productDefinition.product_type_id};`);
      return result.rowCount === 0 ? [] : result.rows[0];
    }
  },
  Product: {
    product_definition: async (product: {product_definition_id: number}) => {
      const result = await db.query(`select pd.* from products_inventory.product_definitions pd, products_inventory.products p where pd.id = ${product.product_definition_id};`);
      return result.rowCount === 0 ? [] : result.rows[0];
    }
  },
  ExpirationDate: {
    product: async (expirationDate: {product_id: number}) => {
      const result = await db.query(`select p.* from products_inventory.products p, products_inventory.expiration_dates ed where p.id = ${expirationDate.product_id};`);
      return result.rowCount === 0 ? [] : result.rows[0];
    }
  }
};

export default productsResolver;
