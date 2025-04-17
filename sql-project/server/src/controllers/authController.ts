import { Request, Response } from "express";
import { pool } from "../models/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
  const {
    client_name,
    client_email,
    client_password,
    client_entry_date,
    client_phone,
  } = req.body;

  try {
    const hashed = await bcrypt.hash(client_password, 10);

    const [result]: any = await pool.execute(
      `INSERT INTO clients (
        client_name, client_email, client_password,
        client_entry_date, client_phone
      ) VALUES (?, ?, ?, ?, ?)`,
      [client_name, client_email, hashed, client_entry_date, client_phone]
    );

    const token = jwt.sign(
      { client_id: result.insertId, client_email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .status(201)
      .json({ message: "Client registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { client_email, client_password } = req.body;

  try {
    const [rows]: any = await pool.execute(
      `SELECT * FROM clients WHERE client_email = ?`,
      [client_email]
    );

    const client = rows[0];
    if (!client) {
      return res.status(401).json({ message: "Client not found" });
    }

    const isMatch = await bcrypt.compare(client_password, client.client_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { client_id: client.client_id, client_email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getCurrentUser = (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, JWT_SECRET) as {
      client_id: number;
      client_email: string;
    };

    res.status(200).json({ client_id: decoded.client_id, client_email: decoded.client_email });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token").status(200).json({ message: "Logged out successfully" });
};
