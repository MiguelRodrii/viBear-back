export const ivaPercentagesTypeDef = `
type Query {
    ivaPercentages: [IvaPercentage]
}

type IvaPercentage {
    id: Int
    value: Float
}
`;
