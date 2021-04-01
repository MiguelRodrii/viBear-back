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
  Mutation: {
    createProductType: async (
      parent: Record<string, unknown>,
      { productType }: {
        productType: {
          name: string;
          is_expirable: boolean;
          iva_percentage_id: number;
        };
      },
    ) => {
      const result = await db.query(
        `insert into products_inventory.product_types ("name", is_expirable, iva_percentage_id) values ('${productType.name}', ${productType.is_expirable}, ${productType.iva_percentage_id}) returning *;
      `,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    updateProductType: async (
      parent: Record<string, unknown>,
      { productType }: {
        productType: {
          id: number;
          name: string;
          is_expirable: boolean;
          iva_percentage_id: number;
        };
      },
    ) => {
      const previousValue = await db.query(
        `select pt.* from products_inventory.product_types pt where pt.id = ${productType.id};`,
      );
      if (previousValue.rowCount === 0) {
        throw new Error("Product type: " + productType.id + " non registered.");
      }
      const result = await db.query(
        `update products_inventory.product_types set "name" = '${
          productType.name === undefined
            ? previousValue.rows[0].name
            : productType.name
        }', is_expirable = ${
          productType.is_expirable === undefined
            ? previousValue.rows[0].is_expirable
            : productType.is_expirable
        }, iva_percentage_id = ${
          productType.iva_percentage_id === undefined
            ? previousValue.rows[0].iva_percentage_id
            : productType.iva_percentage_id
        } where id = ${productType.id} returning *;`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    createProductDefinition: async (
      parent: Record<string, unknown>,
      { productDefinition }: {
        productDefinition: {
          name: string;
          description: string;
          product_type_id: number;
        };
      },
    ) => {
      const result = await db.query(
        `insert into products_inventory.product_definitions ("name", description, product_type_id) values ('${productDefinition.name}', '${productDefinition.description}', ${productDefinition.product_type_id}) returning *;
      `,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    updateProductDefinition: async (
      parent: Record<string, unknown>,
      { productDefinition }: {
        productDefinition: {
          id: number;
          name: string;
          description: string;
          product_type_id: number;
        };
      },
    ) => {
      const previousValue = await db.query(
        `select pd.* from products_inventory.product_definitions pd where pd.id = ${productDefinition.id};`,
      );
      if (previousValue.rowCount === 0) {
        throw new Error(
          "Product definition: " + productDefinition.id + " non registered.",
        );
      }
      const result = await db.query(
        `update products_inventory.product_definitions set "name" = '${
          productDefinition.name === undefined
            ? previousValue.rows[0].name
            : productDefinition.name
        }', description = '${
          productDefinition.description === undefined
            ? previousValue.rows[0].description
            : productDefinition.description
        }', product_type_id = ${
          productDefinition.product_type_id === undefined
            ? previousValue.rows[0].product_type_id
            : productDefinition.product_type_id
        } where id = ${productDefinition.id} returning *;`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    createProduct: async (
      parent: Record<string, unknown>,
      { product }: {
        product: {
          purchase_price: number;
          sale_price: number;
          initial_amount: number;
          current_amount: number;
          product_definition_id: number;
        };
      },
    ) => {
      const result = await db.query(
        `insert into products_inventory.products (initial_amount, current_amount, purchase_price, sale_price, product_definition_id) values 
      (${product.initial_amount}, ${product.current_amount}, ${product.purchase_price}, ${product.sale_price}, ${product.product_definition_id}) returning *;`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    createExpirationDate: async (
      parent: Record<string, unknown>,
      { expirationDate }: {
        expirationDate: { value: Date; product_id: number };
      },
    ) => {
      const result = await db.query(
        `insert into products_inventory.expiration_dates (value, product_id) values ('${expirationDate.value}', ${expirationDate.product_id}) returning *;`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
  ProductType: {
    iva_percentage: async (productType: { iva_percentage_id: number }) => {
      const result = await db.query(
        `select ip.* from products_inventory.iva_percentages ip, products_inventory.product_types pt where ip.id = ${productType.iva_percentage_id};`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
  ProductDefinition: {
    product_type: async (productDefinition: { product_type_id: number }) => {
      const result = await db.query(
        `select pt.* from products_inventory.product_types pt, products_inventory.product_definitions pd where pt.id = ${productDefinition.product_type_id};`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
  Product: {
    product_definition: async (product: { product_definition_id: number }) => {
      const result = await db.query(
        `select pd.* from products_inventory.product_definitions pd, products_inventory.products p where pd.id = ${product.product_definition_id};`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
  ExpirationDate: {
    product: async (expirationDate: { product_id: number }) => {
      const result = await db.query(
        `select p.* from products_inventory.products p, products_inventory.expiration_dates ed where p.id = ${expirationDate.product_id};`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
};

export default productsResolver;
