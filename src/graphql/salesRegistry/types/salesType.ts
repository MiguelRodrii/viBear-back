export const salesType = `
scalar Date

type Query {
    sales: [Sale]
}

type Mutation {
    createSale(sale: CreateSale): Sale
    updateSale(sale: UpdateSale): Sale
}

type Sale {
    id: Int
    client_name: String
    sold_by: String
    address: String
    phone: String
    date: Date
}
input CreateSale {
    client_name: String!
    sold_by: String!
    address: String!
    phone: String!
}
input UpdateSale {
    id: Int!
    client_name: String
    sold_by: String
    address: String
    phone: String
    date: Date
}
`;