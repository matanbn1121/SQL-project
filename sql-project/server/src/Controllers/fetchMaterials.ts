import { RequestHandler } from "express";
import { pool } from "../models/db"

export const fetchMaterials: RequestHandler = async (req, res) => {
    try{
         const [result] = await pool.execute(
            'select * from materials',
        );

        // console.log("results", result);
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