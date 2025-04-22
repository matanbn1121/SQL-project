import { Request, Response } from "express";
import { pool } from "../models/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}
export const register = async (req: Request, res: Response): Promise<Response | any> => {
  const {
    client_name,
    client_email,
    client_password,
    client_entry_date,
    client_phone,
     
  } = req.body;

  console.log("📥 BODY (register):", req.body);

  try {
    const hashed = await bcrypt.hash(client_password, 10);
    console.log("🔐 Hashed password:", hashed);

    const sql = `
    INSERT INTO clients (
      client_name, client_email, client_password,
      client_entry_date, client_phone
    ) VALUES (?, ?, ?, ?, ?)
  `;
  
  const values = [client_name, client_email, hashed, client_entry_date, client_phone];

    console.log("📤 Executing SQL:", sql);
    console.log("📤 With values:", values);

    const [result]: any = await pool.execute(sql, values);

    console.log("✅ Insert result:", result);

    const token = jwt.sign(
      { client_id: result.insertId, client_email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const user = jwt.sign(
      { client_id: result.insertId, client_email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("🔑 Token generated:", token);

    res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .cookie("user", user, { httpOnly: true, sameSite: "strict" })
      .status(201)
      .json({ message: "Client registered successfully" });

  } catch (err: any) {
    console.error("❌ REGISTER ERROR:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { client_email, client_password } = req.body;
  console.log("📥 BODY (login):", req.body);

  try {
    const [rows]: any = await pool.execute(
      `SELECT * FROM clients WHERE client_email = ?`,
      [client_email]
    );

    console.log("🔎 Found client:", rows[0]);

    const client = rows[0];
    if (!client) {
      return res.status(401).json({ message: "Client not found" });
    }

    const isMatch = await bcrypt.compare(client_password, client.client_password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { client_id: client.client_id, client_email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("🔑 Token generated:", token);

    res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .json({ message: "Login successful" });

  } catch (err: any) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getCurrentUser = (req: Request, res: Response): any => {
  try {
    const token = req.cookies.token;
    console.log("🔍 Token (getCurrentUser):", token);

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      client_id: number;
      client_email: string;
    };

    console.log("✅ Decoded token:", decoded);

    res.status(200).json({
      client_id: decoded.client_id,
      client_email: decoded.client_email
    });

  } catch (error) {
    console.error("❌ GET CURRENT USER ERROR:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = (req: Request, res: Response) => {
  console.log("🚪 Logging out");
  res.clearCookie("token").status(200).json({ message: "Logged out successfully" });
};
