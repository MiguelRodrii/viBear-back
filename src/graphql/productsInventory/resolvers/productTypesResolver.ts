import * as productTypesService from "../../../services/productsInventory/productTypesService.ts";
import { findOneById as findOneIvaPercentageById } from "../../../services/productsInventory/ivaPercentagesService.ts";

export const productTypesResolver = {
  Query: {
    productTypes: async () => {
      return await productTypesService.findAll();
    },
  },
  Mutation: {
    createProductType: async (
      _: unknown,
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
      return await productTypesService.createOne(
        productType.name,
        productType.is_expirable,
        productType.iva_percentage_id,
      );
    },
    updateProductType: async (
      _: unknown,
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
      return await productTypesService.updateOneById(productType.id)(
        productType.name,
        productType.is_expirable,
        productType.iva_percentage_id,
      );
    },
    deleteProductType: async (
      _: unknown,
      { id }: { id: number },
    ) => {
      return await productTypesService.deleteOneById(id);
    },
  },
  ProductType: {
    iva_percentage: async (productType: { iva_percentage_id: number }) => {
      return await findOneIvaPercentageById(productType.iva_percentage_id);
    },
  },
};
