import {mergeResolvers} from "../../deps.ts";
import {productsInventoryResolvers} from "./productsInventory/productsInventoryResolvers.ts";
import {salesRegistryResolver} from "./salesRegistry/salesRegistryResolvers.ts";

export const resolvers = mergeResolvers(Array.prototype.concat(productsInventoryResolvers, salesRegistryResolver));