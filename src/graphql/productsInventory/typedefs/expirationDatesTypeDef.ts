export const expirationDatesTypeDef = `
scalar Date

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
