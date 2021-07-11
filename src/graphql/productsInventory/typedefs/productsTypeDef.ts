export const productsTypeDef = `
type Query {
    products(that: String): [Product]
}

type Mutation {
    createProduct(product: CreateProduct): Product
    updateProduct(product: UpdateProduct): Product
    deleteProduct(id: Int!): Boolean
}

type Product {
    id: Int
    purchase_price: Float
    sale_price: Float
    initial_amount: Int
    current_amount: Int
    product_definition: ProductDefinition
    created_at: DateTime
    modified_at: DateTime
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
`;
