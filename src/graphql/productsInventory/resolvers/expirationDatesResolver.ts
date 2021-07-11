import * as expirationDatesService from "../../../services/productsInventory/expirationDatesService.ts";
import { findOneById as findOneProductById } from "../../../services/productsInventory/productsService.ts";

export const expirationDatesResolver = {
  Query: {
    expirationDates: async () => {
      return await expirationDatesService.findAll();
    },
  },
  Mutation: {
    createExpirationDate: async (
      _: unknown,
      {
        expirationDate,
      }: {
        expirationDate: { value: Date; product_id: number };
      },
    ) => {
      return await expirationDatesService.createOne(
        expirationDate.value,
        expirationDate.product_id,
      );
    },
    updateExpirationDate: async (_: unknown, {
      expirationDate,
    }: {
      expirationDate: { id: number; value: Date; product_id: number };
    }) => {
      return await expirationDatesService.updateOneById(expirationDate.id)(
        expirationDate.value,
        expirationDate.product_id,
      );
    },
    deleteExpirationDate: async (
      _: unknown,
      { id }: { id: number },
    ) => {
      return await expirationDatesService.deleteOneById(id);
    },
  },
  ExpirationDate: {
    product: async (expirationDate: { product_id: number }) => {
      return await findOneProductById(expirationDate.product_id);
    },
  },
};
