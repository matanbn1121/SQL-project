import express from 'express';
import authRoutes from "./routes/authRoutes"; 
import { pool } from './models/db';
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true                
}));
app.use(cookieParser())

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running on port 3000');
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
