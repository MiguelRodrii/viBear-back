import { pool as db } from "../../../db/connection.ts";
import * as salesService from "../../../services/salesRegistry/salesService.ts";

export const salesResolver = {
  Query: {
    sales: async () => {
      const result = await db.query("select * from sales_registry.sales;");
      return result.rows;
    },
  },
  Mutation: {
    createSale: async (
      _: unknown,
      {
        sale,
      }: {
        sale: {
          client_name: string;
          sold_by: string;
          address: string;
          phone: string;
        };
      }
    ) => {
      return await salesService.createSale(
        sale.client_name,
        sale.sold_by,
        sale.address,
        sale.phone
      );
    },
    updateSale: async (
      _: unknown,
      {
        sale,
      }: {
        sale: {
          id: number;
          client_name: string;
          sold_by: string;
          address: string;
          phone: string;
          date: Date;
        };
      }
    ) => {
      return await salesService.updateSale(
        sale.id,
        sale.client_name,
        sale.address,
        sale.sold_by,
        sale.phone,
        sale.date
      );
    },
  },
};
