import express from 'express';
import authRoutes from "./routes/authRoutes"; 
import { pool } from './models/db';
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();
const PORT = process.env.PORT || 3000;
const myPassword = process.env.myPassword;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true                
}));
app.use(cookieParser())

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


app.use("/api/auth", authRoutes);

pool.getConnection()
  .then(() => {
    console.log("✅ Connected to MySQL database successfully!");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MySQL:", err);
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
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
            console.log('SLR System is start working');

        });
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();