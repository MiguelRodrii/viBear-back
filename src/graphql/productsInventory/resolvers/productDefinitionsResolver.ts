import * as productDefinitionService from "../../../services/productsInventory/productDefinitionsService.ts";
import { findOneById as findOneProductTypeById } from "../../../services/productsInventory/productTypesService.ts";

export const productDefinitionsResolver = {
  Query: {
    productDefinitions: async () => {
      return await productDefinitionService.findAll();
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
      return await productDefinitionService.createOne(
        productDefinition.name,
        productDefinition.description,
        productDefinition.product_type_id,
      );
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
      return await productDefinitionService.updateOneById(productDefinition.id)(
        productDefinition.name,
        productDefinition.description,
        productDefinition.product_type_id,
      );
    },
    deleteProductDefinition: async (
      _: unknown,
      { id }: { id: number },
    ) => {
      return await productDefinitionService.deleteOneById(id);
    },
  },
  ProductDefinition: {
    product_type: async (productDefinition: { product_type_id: number }) => {
      return await findOneProductTypeById(productDefinition.product_type_id);
    },
  },
};
