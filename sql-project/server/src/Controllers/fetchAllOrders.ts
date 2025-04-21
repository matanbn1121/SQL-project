import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

import { RequestHandler } from "express";
import { pool } from "../models/db";
import jwt from 'jwt-simple';

export const fetchAllOrders: RequestHandler = async (req, res) => {
    try{
         const [result] = await pool.execute(
            `select * from orders`
        );

        // console.log("results", result);
        res.status(200).json({
            success: true,
            message: 'show orders by client id',
            result
        });

    }
    catch (error) {
        console.error('fetch orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetch orders by client id',
            error: (error as Error).message
        });
    }
}