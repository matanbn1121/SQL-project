// src/server.ts - Express MySQL User Registration

import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
const jwt = require('jwt-simple');
import cors from 'cors';
dotenv.config()



// Create the Express application
const app = express();
const PORT = process.env.PORT || 3000;
const myPassword = process.env.myPassword;
const secret = process.env.secret;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'], // Array of allowed origins
    credentials: true,
}));

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: myPassword,
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// IMPORTANT: Define handler types correctly to match Express expectations
type RequestHandler = (req: Request, res: Response) => Promise<void> | void;

// Define route handlers with the correct type
const registerUser: RequestHandler = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        console.log(username, email, password);
        // Basic validation
        if (!username || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into database
        const [result] = await pool.execute(
            'insert into users (user_name, user_password, user_email) values (?, ?, ?)',
            [username,hashedPassword, email]
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

const loginUser: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
console.log(email)
console.log(password)
        // Basic validation
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        // Find user by email
        const [rows] = await pool.execute('SELECT * FROM users WHERE user_email = ?', [email]);
        const users = rows as any[];

        console.log(users);

        if (users.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const user = users[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.user_password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        //create cookie
        const token = jwt.encode({ id: user.user_id }, secret, 'HS256', 'none');

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

const AddProduct: RequestHandler = async (req, res) => {
    try{
        const { products_name, products_price, products_description, products_imageUrl} = req.body;
        console.log(products_name)
        console.log(products_price)
        console.log(products_description)
        console.log(products_imageUrl)

        if (!products_description || !products_imageUrl || !products_name || !products_price)
        {
            res.status(400).json({ message: 'Data are required' });
            return;
        }

         // Insert new product to the database
         const [result] = await pool.execute(
            'insert into products (products_name, products_price, products_description, products_imageUrl) values (?, ?, ?, ?)',
            [products_name,products_price, products_description, products_imageUrl]
        );

        console.log("results", result);

        res.status(200).json({
            success: true,
            message: 'added product successful!',
        });


    }
    catch (error) {
        console.error('insert new products error:', error);
        res.status(500).json({
            success: false,
            message: 'Error add products',
            error: (error as Error).message
        });
    }
}

const ShowAllProducts: RequestHandler = async (req, res) => {
    try{
         const [result] = await pool.execute(
            'select * from products',
        );

        console.log("results", result);
        res.status(200).json({
            success: true,
            message: 'show all products',
            result
        });

    }
    catch (error) {
        console.error('insert new products error:', error);
        res.status(500).json({
            success: false,
            message: 'Error add products',
            error: (error as Error).message
        });
    }
}

// Register routes
app.post('/api/users/register', registerUser);
app.post('/api/users/login', loginUser);
app.post('/api/products/addProduct', AddProduct);
app.get('/api/products/showAllProducts', ShowAllProducts)

// Create the users table if it doesn't exist
const initializeDatabase = async () => {
    try {
        await pool.execute(`
        CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
};

// Start the server
const startServer = async () => {
    try {
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log('Available routes:');
            console.log('POST /api/users/register - Register a new user');
            console.log('POST /api/users/login - Login a user');
        });
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();