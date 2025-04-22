import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import dotenv from "dotenv";
import { pool } from './models/db';
import mainRoutes from './routes/mainRoutes';
export type RequestHandler = (req: Request, res: Response) => Promise<void> | void;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true                
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/main", mainRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

pool.getConnection()
  .then(() => {
    console.log("✅ Connected to MySQL successfully from db.ts");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MySQL:", err);
  });