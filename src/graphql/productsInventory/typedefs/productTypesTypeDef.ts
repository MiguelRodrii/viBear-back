export const productTypesTypeDef = `
type Query {
    productTypes: [ProductType]
}

type Mutation {
    createProductType(productType: CreateProductType): ProductType
    updateProductType(productType: UpdateProductType): ProductType
    deleteProductType(id: Int!): Boolean
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
`;
