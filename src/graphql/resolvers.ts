import {mergeResolvers} from 'https://cdn.skypack.dev/@graphql-tools/merge';
import {productsInventoryResolvers} from "./productsInventory/productsInventoryResolvers.ts";
import {salesRegistryResolver} from "./salesRegistry/salesRegistryResolvers.ts";

export const resolvers = mergeResolvers(Array.prototype.concat(productsInventoryResolvers, salesRegistryResolver));