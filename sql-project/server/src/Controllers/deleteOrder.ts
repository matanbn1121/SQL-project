import { Request, Response } from "express";
import { pool } from "../models/db";

export const deleteOrderByClient = async (req: Request, res: Response): Promise<Response | any> => {
  const { orderId } = req.params;

  try {
    const sql = "DELETE FROM orders WHERE order_id = ?";
    const [result] = await pool.execute(sql, [orderId]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "ההזמנה לא נמצאה" });
    }

    res.status(200).json({ message: "ההזמנה נמחקה בהצלחה" });
  } catch (error) {
    console.error("שגיאה במחיקת ההזמנה:", error);
    res.status(500).json({ error: "שגיאה בשרת בעת מחיקת ההזמנה" });
  }
};