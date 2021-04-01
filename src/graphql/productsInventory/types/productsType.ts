import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

const productsType = gql(`
scalar Date

type Query {
    ivaPercentages: [IvaPercentage]
    productTypes: [ProductType]
    productDefinitions: [ProductDefinition]
    products: [Product]
    expirationDates: [ExpirationDate]
}

type IvaPercentage {
    id: Int
    value: Float
}

type ProductType {
    id: Int
    name: String
    is_expirable: Boolean
    iva_percentage: IvaPercentage    
}

type ProductDefinition {
    id: Int
    name: String
    description: String
    product_type: ProductType    
}

type Product {
    id: Int
    purchase_price: Float
    sale_price: Float
    initial_amount: Int
    current_amount: Int
    product_definition: ProductDefinition
}

type ExpirationDate {
    id: Int
    product: Product
    value: Date
}
`);

export default productsType;