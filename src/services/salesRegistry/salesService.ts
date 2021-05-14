import { pool as db } from "../../db/connection.ts";

export const createSale = async (
  clientName: string,
  soldBy: string,
  address: string,
  phone: string
) => {
  if (clientName === "")
    throw new Error("Please specify a valid value for client_name.");
  if (soldBy === "")
    throw new Error("Please specify a valid value for sold_by.");
  if (address === "")
    throw new Error("Please specify a valid value for address.");
  if (phone === "" || phone.length > 9)
    throw new Error("Please specify a valid value for phone.");
  const result = await db.query(
    `insert into sales_registry.sales (client_name, phone, address, "date", sold_by) values ('${clientName}', '${phone}', '${address}', CURRENT_DATE, '${soldBy}') returning *;`
  );
  return result.rowCount === 0 ? null : result.rows[0];
};

export const updateSale = async (
  id: number,
  clientName: string | undefined,
  soldBy: string | undefined,
  address: string | undefined,
  phone: string | undefined,
  date: Date | undefined
) => {
  const previousValue = await db.query(
    `select * from sales_registry.sales s where s.id = ${id};`
  );
  if (previousValue.rowCount === 0) {
    throw new Error("Sale: " + id + " non registered.");
  }
  console.log(new Date(previousValue.rows[0].date));
  const result = await db.query(
    `UPDATE sales_registry.sales SET client_name = '${
      clientName === undefined ? previousValue.rows[0].client_name : clientName
    }', sold_by = '${
      soldBy === undefined ? previousValue.rows[0].sold_by : soldBy
    }', address = '${
      address === undefined ? previousValue.rows[0].address : address
    }', phone = '${
      phone === undefined ? previousValue.rows[0].phone : phone
    }', "date" = '${
      date === undefined
        ? new Date(previousValue.rows[0].date).toDateString()
        : date
    }' where id = ${id} returning *;`
  );
  return result.rowCount === 0 ? null : result.rows[0];
};
