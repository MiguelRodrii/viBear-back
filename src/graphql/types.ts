import {mergeTypeDefs} from 'https://cdn.skypack.dev/@graphql-tools/merge';
import {productsInventoryTypes} from "./productsInventory/productsInventoryTypes.ts";
import {salesRegistryTypes} from "./salesRegistry/salesRegistryTypes.ts";

export const types = mergeTypeDefs(Array.prototype.concat(productsInventoryTypes, salesRegistryTypes));