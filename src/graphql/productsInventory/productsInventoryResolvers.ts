import { ivaPercentagesResolver } from "./resolvers/ivaPercentagesResolver.ts";
import { productTypesResolver } from "./resolvers/productTypesResolver.ts";
import { productDefinitionsResolver } from "./resolvers/productDefinitionsResolver.ts";
import { productsResolver } from "./resolvers/productsResolver.ts";
import { expirationDatesResolver } from "./resolvers/expirationDatesResolver.ts";

export const productsInventoryResolvers = [
  ivaPercentagesResolver,
  productTypesResolver,
  productDefinitionsResolver,
  productsResolver,
  expirationDatesResolver,
];
