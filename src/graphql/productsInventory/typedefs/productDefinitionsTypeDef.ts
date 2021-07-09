export const productDefinitionsTypeDef = `
type Query {
    productDefinitions: [ProductDefinition]
}

type Mutation {
    createProductDefinition(productDefinition: CreateProductDefinition): ProductDefinition
    updateProductDefinition(productDefinition: UpdateProductDefinition): ProductDefinition
    deleteProductDefinition(id: Int!): Boolean
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
`;
