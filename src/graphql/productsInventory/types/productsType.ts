import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

const productsType = gql(`
type Query {
    products: [Product]
}

type Product {
    id: Int
    purchase_price: Float
    sale_price: Float
    initial_amount: Int
    current_amount: Int
}
`);

export default productsType;