import { Request, Response } from "express";
import { pool } from "../models/db";


export const send_new_order = async (req: Request, res: Response): Promise<Response | any> => {
    const {
        order_date,
        delivery_date,
        praises,
        sticker_quantity,
        client_id,
        materials_id,
    } = req.body;
  
    console.log("📥 BODY (register):", req.body);
  
    try {

  
      const sql = `insert into orders(
            order_date, delivery_date,praises, sticker_quantity,
            client_id, materials_id
            ) values (?,?,?,?,?,?)
             `;

      const values = [
        order_date as unknown as Date,
        delivery_date,
        praises,
        sticker_quantity,
        client_id,materials_id
      ];
  
      console.log("📤 Executing SQL:", sql);
      console.log("📤 With values:", values);
  
      const [result]: any = await pool.execute(sql, values);
  
      console.log("✅ Insert result:", result);
  
      res
        .status(201)
        .json({ message: "recvied order successfully" });
  
    } catch (err: any) {
      console.error("❌ reviced order ERROR:", err);
    
      res.status(500).json({ message: "Registration failed", error: err.message });
    }
  };