import { pool, RequestHandler } from "../server";

export const fetchOrdersByClient: RequestHandler = async (req, res) => {
    try{
         const [result] = await pool.execute(
            `SELECT
                c.client_id,
                o.order_id,
                o.order_date,
                o.delivery_date,
                o.order_feedback,
                o.order_sticker_quantity,
                m.material_description
            FROM
                orders o
            JOIN
                materials m ON m.materials_id = o.materials_id
            JOIN
                clients c ON c.client_id = o.client_id;`,
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