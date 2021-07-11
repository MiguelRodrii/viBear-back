import * as ivaPercentagesService from "../../../services/productsInventory/ivaPercentagesService.ts";

export const ivaPercentagesResolver = {
  Query: {
    ivaPercentages: async () => {
      return await ivaPercentagesService.findAll();
    },
  },
};
