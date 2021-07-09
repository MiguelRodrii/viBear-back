import { pool as db } from "../../../db/connection.ts";
import { GQLError } from "../../../../deps.ts";
import * as productsService from "../../../services/productsInventory/productsService.ts";

const productsResolver = {
  Query: {
    productDefinitions: async () => {
      const result = await db.query(
        "select * from products_inventory.product_definitions order by id desc",
      );
      return result.rows;
    },
    products: async (_: unknown, {
      that,
    }: {
      that: string | undefined;
    }) => {
      try {
        switch (that) {
          case "expired": {
            return await productsService.findExpired();
          }
          case "available": {
            return await productsService.findAvailable();
          }
          default: {
            return await productsService.findAll();
          }
        }
      } catch (error) {
        throw new GQLError({
          type: "unknown",
          message: error.message,
        });
      }
    },
    expirationDates: async () => {
      const result = await db.query(
        "select * from products_inventory.expiration_dates order by id desc",
      );
      return result.rows;
    },
  },
  Mutation: {
    createProductDefinition: async (
      _: unknown,
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
      const result = await db.query(
        `insert into products_inventory.product_definitions ("name", description, product_type_id) values ('${productDefinition.name}', '${productDefinition.description}', ${productDefinition.product_type_id}) returning *;
      `,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    },
    updateProductDefinition: async (
      _: unknown,
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
      return result.rowCount === 0 ? null : result.rows[0];
    },
    deleteProductDefinition: async (
      _: unknown,
      { id }: { id: number },
    ) => {
      try {
        await db.query(
          `delete from products_inventory.product_definitions where id = ${id};`,
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createProduct: async (
      _: unknown,
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
      const result = await db.query(
        `insert into products_inventory.products (initial_amount, current_amount, purchase_price, sale_price, product_definition_id) values 
      (${product.initial_amount}, ${product.current_amount}, ${product.purchase_price}, ${product.sale_price}, ${product.product_definition_id}) returning *;`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    },
    updateProduct: async (
      _: unknown,
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
      const previousValue = await db.query(
        `select p.* from products_inventory.products p where p.id = ${product.id};`,
      );
      if (previousValue.rowCount === 0) {
        throw new Error("Product: " + product.id + " non registered.");
      }
      const result = await db.query(
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
      return result.rowCount === 0 ? null : result.rows[0];
    },
    deleteProduct: async (
      _: unknown,
      { id }: { id: number },
    ) => {
      try {
        await db.query(
          `delete from products_inventory.products where id = ${id};`,
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createExpirationDate: async (
      _: unknown,
      {
        expirationDate,
      }: {
        expirationDate: { value: Date; product_id: number };
      },
    ) => {
      const result = await db.query(
        `insert into products_inventory.expiration_dates (value, product_id) values ('${expirationDate.value}', ${expirationDate.product_id}) returning *;`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    },
    updateExpirationDate: async (_: unknown, {
      expirationDate,
    }: {
      expirationDate: { id: number; value: Date; product_id: number };
    }) => {
      const previousValue = await db.query(
        `select ed.* from products_inventory.expiration_dates ed where ed.id = ${expirationDate.id};`,
      );
      if (previousValue.rowCount === 0) {
        throw new Error(
          "Expiration date: " + expirationDate.id + " non registered.",
        );
      }
      const result = await db.query(
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
      return result.rowCount === 0 ? null : result.rows[0];
    },
    deleteExpirationDate: async (
      _: unknown,
      { id }: { id: number },
    ) => {
      try {
        await db.query(
          `delete from products_inventory.expiration_dates where id = ${id};`,
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  ProductDefinition: {
    product_type: async (productDefinition: { product_type_id: number }) => {
      const result = await db.query(
        `select pt.* from products_inventory.product_types pt, products_inventory.product_definitions pd where pt.id = ${productDefinition.product_type_id};`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    },
  },
  Product: {
    product_definition: async (product: { product_definition_id: number }) => {
      const result = await db.query(
        `select pd.* from products_inventory.product_definitions pd, products_inventory.products p where pd.id = ${product.product_definition_id};`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    },
  },
  ExpirationDate: {
    product: async (expirationDate: { product_id: number }) => {
      const result = await db.query(
        `select p.* from products_inventory.products p, products_inventory.expiration_dates ed where p.id = ${expirationDate.product_id};`,
      );
      return result.rowCount === 0 ? null : result.rows[0];
    },
  },
};

export default productsResolver;
