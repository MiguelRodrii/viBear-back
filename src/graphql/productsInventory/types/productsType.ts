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

type Mutation {
    createProductType(productType: ProductTypeInput): ProductType
    createProductDefinition(productDefinition: ProductDefinitionInput): ProductDefinition
    createProduct(product: ProductInput): Product
    createExpirationDate(expirationDate: ExpirationDateInput): ExpirationDate
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
input ProductTypeInput {
    name: String!
    is_expirable: Boolean!
    iva_percentage_id: Int!
}

type ProductDefinition {
    id: Int
    name: String
    description: String
    product_type: ProductType    
}
input ProductDefinitionInput {
    name: String!
    description: String!
    product_type_id: Int!
}

type Product {
    id: Int
    purchase_price: Float
    sale_price: Float
    initial_amount: Int
    current_amount: Int
    product_definition: ProductDefinition
}
input ProductInput {
    purchase_price: Float!
    sale_price: Float!
    initial_amount: Int!
    current_amount: Int!
    product_definition_id: Int!
}

type ExpirationDate {
    id: Int
    product: Product
    value: Date
}
input ExpirationDateInput {
    product_id: Int!
    value: Date!
}
`);

export default productsType;