import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

import { RequestHandler } from "express";
import { pool } from "../models/db";
import jwt from 'jwt-simple';

export const fetchOrdersByClient: RequestHandler = async (req, res) => {
    try{
                const user = req.cookies.token; 
                
                const decoded = jwt.decode(user, secret as string);
                const clientId = decoded.client_id;
         const [result] = await pool.execute(
            `SELECT
                c.client_id,
                o.order_id,
                o.order_date,
                o.delivery_date,
                o.praises,
                o.sticker_quantity,
                m.materials_type
            FROM
                orders o
            JOIN
                materials m ON m.materials_id = o.materials_id
            JOIN
                clients c ON c.client_id = o.client_id
            WHERE
                c.client_id = ?;`,[clientId]
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