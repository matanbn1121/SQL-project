import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import dotenv from "dotenv";
import cors from 'cors';
import mainRoutes from './Routes/mainRoutes';
export type RequestHandler = (req: Request, res: Response) => Promise<void> | void;
dotenv.config()

// Create the Express application
const app = express();
const PORT = process.env.PORT || 3000;
const myPassword = process.env.myPassword;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'], // Array of allowed origins
    credentials: true,
}));

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create MySQL connection pool
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: myPassword,
    database: 'sql_slr_Project',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


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


app.post('/api/products/addProduct', AddProduct);
app.use("/api", mainRoutes);

// Start the server
const startServer = async () => {
    try {
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