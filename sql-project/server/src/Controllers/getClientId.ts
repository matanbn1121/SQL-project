import { pool, RequestHandler } from "../server";
const secret = process.env.secret;
import jwt from 'jwt-simple';
import dotenv from 'dotenv';

dotenv.config();

export const fetchClientId: RequestHandler = async (req,res) => {
    try{
        const token = req.cookies.token; 
        const decoded = jwt.decode(token, secret as string);
        const clientId = decoded.id;
    
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