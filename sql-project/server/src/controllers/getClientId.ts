import { RequestHandler } from "express";
const secret = process.env.JWT_SECRET;
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import { pool } from "../models/db"

dotenv.config();

export const fetchClientId: RequestHandler = async (req,res) => {
    try{
        const user = req.cookies.token; 
        console.log(user)
        const decoded = jwt.decode(user, secret as string);
        console.log(decoded)
        const clientId = decoded.client_id;
        console.log(clientId)
    
        const [result] = await pool.execute(
            'select * from clients where client_id = ?', [clientId]
        )
            console.log("clientId result", result)
            res.status(200).json({
                success: true,
                message: 'show all client infromation',
                result
            });
                console.log("client id is")
                console.log(clientId)
                console.log("deatils of this client")
                console.log(result)
    }
    catch (error){
        console.log('get client id error:', error)
        res.status(500).json({
            success: false,
            message: 'Error add client id',
            error: (error as Error).message
        })
    }
}