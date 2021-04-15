export const salesType = `
scalar Date

type Query {
    sales: [Sale]
}

type Sale {
    id: Int
    client_name: String
    sold_by: String
    address: String
    phone: String
    date: Date
}
`;