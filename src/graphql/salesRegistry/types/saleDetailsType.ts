export const saleDetailsType = `
type Query {
    saleDetails (sale_id: Int) {
        
    }
}

type SaleDetail {
    id: Int
    amount: Int
    sale_price: Float
    iva_percentage: IvaPercentage
    product: Product
    sale: Sale
}
`;