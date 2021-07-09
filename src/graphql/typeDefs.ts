import { mergeTypeDefs } from "../../deps.ts";
import { productsInventoryTypeDefs } from "./productsInventory/productsInventoryTypeDefs.ts";
import { salesRegistryTypes } from "./salesRegistry/salesRegistryTypes.ts";

export const typeDefs = mergeTypeDefs(
  Array.prototype.concat(productsInventoryTypeDefs, salesRegistryTypes),
);
