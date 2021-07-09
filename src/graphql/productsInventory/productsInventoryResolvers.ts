import productsResolver from "./resolvers/productsResolver.ts";
import { ivaPercentagesResolver } from "./resolvers/ivaPercentagesResolver.ts";
import { productTypesResolver } from "./resolvers/productTypesResolver.ts";

export const productsInventoryResolvers = [
  productsResolver,
  ivaPercentagesResolver,
  productTypesResolver,
];
