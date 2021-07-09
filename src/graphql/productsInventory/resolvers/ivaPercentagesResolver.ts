import * as ivaPercentagesService from "../../../services/productsInventory/ivaPercentagesService.ts";
//import {pool as db} from "../../../db/connection.ts";

export const ivaPercentagesResolver = {
  Query: {
    ivaPercentages: async () => {
      return await ivaPercentagesService.findAll();
    },
  },
};
