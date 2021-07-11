import * as productsService from "../../../services/productsInventory/productsService.ts";
import { findOneById as findOneProductDefinitionById } from "../../../services/productsInventory/productDefinitionsService.ts";

export const productsResolver = {
  Query: {
    products: async (_: unknown, {
      that,
    }: {
      that: string | undefined;
    }) => {
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
    },
  },
  Mutation: {
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
      return await productsService.createOne(
        product.purchase_price,
        product.sale_price,
        product.initial_amount,
        product.current_amount,
        product.product_definition_id,
      );
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
      return await productsService.updateOneById(product.id)(
        product.purchase_price,
        product.sale_price,
        product.initial_amount,
        product.current_amount,
        product.product_definition_id,
      );
    },
    deleteProduct: async (
      _: unknown,
      { id }: { id: number },
    ) => {
      return await productsService.deleteOneById(id);
    },
  },
  Product: {
    product_definition: async (product: { product_definition_id: number }) => {
      return await findOneProductDefinitionById(product.product_definition_id);
    },
  },
};
