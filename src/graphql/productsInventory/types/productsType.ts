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
    createProductType(productType: CreateProductType): ProductType
    updateProductType(productType: UpdateProductType): ProductType
    createProductDefinition(productDefinition: CreateProductDefinition): ProductDefinition
    updateProductDefinition(productDefinition: UpdateProductDefinition): ProductDefinition
    createProduct(product: CreateProduct): Product
    updateProduct(product: UpdateProduct): Product
    createExpirationDate(expirationDate: CreateExpirationDate): ExpirationDate
    updateExpirationDate(expirationDate: UpdateExpirationDate): ExpirationDate
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
input CreateProductType {
    name: String!
    is_expirable: Boolean!
    iva_percentage_id: Int!
}
input UpdateProductType {
    id: Int!
    name: String
    is_expirable: Boolean
    iva_percentage_id: Int
}

type ProductDefinition {
    id: Int
    name: String
    description: String
    product_type: ProductType    
}
input CreateProductDefinition {
    name: String!
    description: String!
    product_type_id: Int!
}
input UpdateProductDefinition {
    id: Int!
    name: String
    description: String
    product_type_id: Int
}

type Product {
    id: Int
    purchase_price: Float
    sale_price: Float
    initial_amount: Int
    current_amount: Int
    product_definition: ProductDefinition
}
input CreateProduct {
    purchase_price: Float!
    sale_price: Float!
    initial_amount: Int!
    current_amount: Int!
    product_definition_id: Int!
}
input UpdateProduct {
    id: Int!
    purchase_price: Float
    sale_price: Float
    initial_amount: Int
    current_amount: Int
    product_definition_id: Int
}

type ExpirationDate {
    id: Int
    product: Product
    value: Date
}
input CreateExpirationDate {
    product_id: Int!
    value: Date!
}
input UpdateExpirationDate {
    id: Int!
    product_id: Int
    value: Date
}
`);

export default productsType;