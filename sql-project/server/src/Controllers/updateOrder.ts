import { Request, Response } from "express";
import { pool } from "../models/db";

const fixDate = (dateString: string) => {
  return dateString.split("T")[0];
};

export const updateOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const {
    order_date,
    delivery_date,
    praises,
    sticker_quantity,
    materials_type,
  } = req.body;

  try {
    const sql = `
      UPDATE orders
      SET 
        order_date = ?,
        delivery_date = ?,
        praises = ?, 
        sticker_quantity = ?,
        materials_id = ?
      WHERE order_id = ?
    `;

    const values = [
      fixDate(order_date),
      fixDate(delivery_date),
      praises,
      sticker_quantity,
      materials_type,
      order_id,
    ];

    const [result] = await pool.execute(sql, values);
    res.status(200).json({ message: "עודכן בהצלחה" });
  } catch (err: any) {
    console.error("❌ שגיאה בשרת:", err.message);
    res.status(500).json({ error: "שגיאה בשרת", details: err.message });
  }
};