import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import { pool, RequestHandler } from '../server';
const secret = process.env.secret;
const jwt = require('jwt-simple');
dotenv.config()

export const loginClient: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Basic validation
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        // Find user by email
        const [rows] = await pool.execute('SELECT * FROM clients WHERE client_email = ?', [email]);
        const clients = rows as any[];

        console.log(clients);

        if (clients.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const client = clients[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, client.client_password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        //create cookie
        const token = jwt.encode({ id: client.client_id }, secret, 'HS256', 'none');

        res.cookie('token', token, { httpOnly: true, secure: false });

        res.status(200).json({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: (error as Error).message
        });
    }
};