import { pool as db } from "../../../db/connection.ts";

export const salesResolver = {
    Query: {
        sales: async () => {
            const result = await db.query("select * from sales_registry.sales;");
            return result.rows;
        }
    }
};