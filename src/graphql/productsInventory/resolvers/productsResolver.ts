import { executeQuery } from "../../../db/connection.ts";

const productsResolver = {
  Query: {
    ivaPercentages: async () => {
      const result = await executeQuery(
        "select * from products_inventory.iva_percentages",
      );
      return result.rows;
    },
    productTypes: async () => {
      const result = await executeQuery(
        "select * from products_inventory.product_types",
      );
      return result.rows;
    },
    productDefinitions: async () => {
      const result = await executeQuery(
        "select * from products_inventory.product_definitions",
      );
      return result.rows;
    },
    products: async () => {
      const result = await executeQuery(
        "select * from products_inventory.products",
      );
      return result.rows;
    },
    expirationDates: async () => {
      const result = await executeQuery(
        "select * from products_inventory.expiration_dates",
      );
      return result.rows;
    },
  },
  Mutation: {
    createProductType: async (
      parent: Record<string, unknown>,
      {
        productType,
      }: {
        productType: {
          name: string;
          is_expirable: boolean;
          iva_percentage_id: number;
        };
      },
    ) => {
      const result = await executeQuery(
        `insert into products_inventory.product_types ("name", is_expirable, iva_percentage_id) values ('${productType.name}', ${productType.is_expirable}, ${productType.iva_percentage_id}) returning *;
      `,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    updateProductType: async (
      parent: Record<string, unknown>,
      {
        productType,
      }: {
        productType: {
          id: number;
          name: string;
          is_expirable: boolean;
          iva_percentage_id: number;
        };
      },
    ) => {
      const previousValue = await executeQuery(
        `select pt.* from products_inventory.product_types pt where pt.id = ${productType.id};`,
      );
      if (previousValue.rowCount === 0) {
        throw new Error("Product type: " + productType.id + " non registered.");
      }
      const result = await executeQuery(
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
    deleteProductType: async (
      parent: Record<string, unknown>,
      { id }: { id: number },
    ) => {
      try {
        await executeQuery(
          `delete from products_inventory.product_types where id = ${id};`,
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createProductDefinition: async (
      parent: Record<string, unknown>,
      {
        productDefinition,
      }: {
        productDefinition: {
          name: string;
          description: string;
          product_type_id: number;
        };
      },
    ) => {
      const result = await executeQuery(
        `insert into products_inventory.product_definitions ("name", description, product_type_id) values ('${productDefinition.name}', '${productDefinition.description}', ${productDefinition.product_type_id}) returning *;
      `,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    updateProductDefinition: async (
      parent: Record<string, unknown>,
      {
        productDefinition,
      }: {
        productDefinition: {
          id: number;
          name: string;
          description: string;
          product_type_id: number;
        };
      },
    ) => {
      const previousValue = await executeQuery(
        `select pd.* from products_inventory.product_definitions pd where pd.id = ${productDefinition.id};`,
      );
      if (previousValue.rowCount === 0) {
        throw new Error(
          "Product definition: " + productDefinition.id + " non registered.",
        );
      }
      const result = await executeQuery(
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
    deleteProductDefinition: async (
      parent: Record<string, unknown>,
      { id }: { id: number },
    ) => {
      try {
        await executeQuery(
          `delete from products_inventory.product_definitions where id = ${id};`,
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createProduct: async (
      parent: Record<string, unknown>,
      {
        product,
      }: {
        product: {
          purchase_price: number;
          sale_price: number;
          initial_amount: number;
          current_amount: number;
          product_definition_id: number;
        };
      },
    ) => {
      const result = await executeQuery(
        `insert into products_inventory.products (initial_amount, current_amount, purchase_price, sale_price, product_definition_id) values 
      (${product.initial_amount}, ${product.current_amount}, ${product.purchase_price}, ${product.sale_price}, ${product.product_definition_id}) returning *;`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    updateProduct: async (
      parent: Record<string, unknown>,
      {
        product,
      }: {
        product: {
          id: number;
          purchase_price: number;
          sale_price: number;
          initial_amount: number;
          current_amount: number;
          product_definition_id: number;
        };
      },
    ) => {
      const previousValue = await executeQuery(
        `select p.* from products_inventory.products p where p.id = ${product.id};`,
      );
      if (previousValue.rowCount === 0) {
        throw new Error("Product: " + product.id + " non registered.");
      }
      const result = await executeQuery(
        `update products_inventory.products set initial_amount = ${
          product.initial_amount === undefined
            ? previousValue.rows[0].initial_amount
            : product.initial_amount
        }, current_amount = ${
          product.current_amount === undefined
            ? previousValue.rows[0].current_amount
            : product.current_amount
        }, purchase_price = ${
          product.purchase_price === undefined
            ? previousValue.rows[0].purchase_price
            : product.purchase_price
        }, sale_price = ${
          product.sale_price === undefined
            ? previousValue.rows[0].sale_price
            : product.sale_price
        }, product_definition_id = ${
          product.product_definition_id === undefined
            ? previousValue.rows[0].product_definition_id
            : product.product_definition_id
        } where id = ${product.id} returning *;`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    deleteProduct: async (
      parent: Record<string, unknown>,
      { id }: { id: number },
    ) => {
      try {
        await executeQuery(
          `delete from products_inventory.products where id = ${id};`,
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createExpirationDate: async (
      parent: Record<string, unknown>,
      {
        expirationDate,
      }: {
        expirationDate: { value: Date; product_id: number };
      },
    ) => {
      const result = await executeQuery(
        `insert into products_inventory.expiration_dates (value, product_id) values ('${expirationDate.value}', ${expirationDate.product_id}) returning *;`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    updateExpirationDate: async (parent: Record<string, unknown>, {
      expirationDate,
    }: {
      expirationDate: { id: number; value: Date; product_id: number };
    }) => {
      const previousValue = await executeQuery(
        `select ed.* from products_inventory.expiration_dates ed where ed.id = ${expirationDate.id};`,
      );
      if (previousValue.rowCount === 0) {
        throw new Error(
          "Expiration date: " + expirationDate.id + " non registered.",
        );
      }
      const result = await executeQuery(
        `update products_inventory.expiration_dates set value = '${
          expirationDate.value === undefined
            ? previousValue.rows[0].value
            : expirationDate.value
        }', product_id = ${
          expirationDate.product_id === undefined
            ? previousValue.rows[0].product_id
            : expirationDate.product_id
        } where id = ${expirationDate.id} returning *;`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
    deleteExpirationDate: async (
      parent: Record<string, unknown>,
      { id }: { id: number },
    ) => {
      try {
        await executeQuery(
          `delete from products_inventory.expiration_dates where id = ${id};`,
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  ProductType: {
    iva_percentage: async (productType: { iva_percentage_id: number }) => {
      const result = await executeQuery(
        `select ip.* from products_inventory.iva_percentages ip, products_inventory.product_types pt where ip.id = ${productType.iva_percentage_id};`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
  ProductDefinition: {
    product_type: async (productDefinition: { product_type_id: number }) => {
      const result = await executeQuery(
        `select pt.* from products_inventory.product_types pt, products_inventory.product_definitions pd where pt.id = ${productDefinition.product_type_id};`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
  Product: {
    product_definition: async (product: { product_definition_id: number }) => {
      const result = await executeQuery(
        `select pd.* from products_inventory.product_definitions pd, products_inventory.products p where pd.id = ${product.product_definition_id};`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
  ExpirationDate: {
    product: async (expirationDate: { product_id: number }) => {
      const result = await executeQuery(
        `select p.* from products_inventory.products p, products_inventory.expiration_dates ed where p.id = ${expirationDate.product_id};`,
      );
      return result.rowCount === 0 ? [] : result.rows[0];
    },
  },
};

export default productsResolver;
