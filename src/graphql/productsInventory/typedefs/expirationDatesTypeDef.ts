export const expirationDatesTypeDef = `
scalar Date
scalar DateTime

type Query {
    expirationDates: [ExpirationDate]
}

type Mutation {
    createExpirationDate(expirationDate: CreateExpirationDate): ExpirationDate
    updateExpirationDate(expirationDate: UpdateExpirationDate): ExpirationDate
    deleteExpirationDate(id: Int!): Boolean 
}

type ExpirationDate {
    id: Int
    value: Date
    product: Product
    created_at: DateTime
    modified_at: DateTime
}
input CreateExpirationDate {
    value: Date!
    product_id: Int!
}
input UpdateExpirationDate {
    id: Int!
    value: Date
    product_id: Int
}
`;
