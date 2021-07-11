export const ivaPercentagesTypeDef = `
type Query {
    ivaPercentages: [IvaPercentage]
}

type IvaPercentage {
    id: Int
    value: Float
    created_at: DateTime
    modified_at: DateTime
}
`;
