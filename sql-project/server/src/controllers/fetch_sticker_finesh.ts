import { RequestHandler } from "express";
import { pool } from "../models/db"

export const fetch_sticker_finesh: RequestHandler = async (req, res) => {
    try{
         const [result] = await pool.execute(
            'select * from sticker_finish',
        );

        // console.log("results", result);
        res.status(200).json({
            success: true,
            message: 'show all sticker_finish',
            result
        });

    }
    catch (error) {
        console.error('sticker_finish error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sticker_finish',
            error: (error as Error).message
        });
    }
}