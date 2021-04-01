import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

const productDefinitionsType = gql(`
type Query {
    productDefinitions: [ProductDefinitions]
}

type ProductDefinitions {
    id: Int
    name: String
    description: String
}
`);

export default productDefinitionsType;