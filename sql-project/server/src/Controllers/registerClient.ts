import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from "dotenv";
import { pool, RequestHandler } from '../server';
dotenv.config()

export const registerClient: RequestHandler = async (req, res) => {
    try {
        console.log("123")
        const { first_name, last_name, company_name, address, phone, password, email } = req.body;
        console.log(company_name, email, password);
        // Basic validation
        if (!first_name || !last_name || !company_name || !address || !phone || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into database
        const [result] = await pool.execute(
            'insert into clients (client_firstName, client_lastName, client_company_name, client_address, client_phone, client_password, client_email) values (?, ?, ?,?,?,?,?)',
            [first_name, last_name, company_name, address, phone, hashedPassword, email]
        );

        console.log("results", result);

        const insertResult = result as mysql.ResultSetHeader;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: insertResult.insertId
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: (error as Error).message
        });
    }
};

