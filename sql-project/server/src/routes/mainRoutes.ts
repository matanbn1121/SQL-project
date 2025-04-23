import express from "express";
import { send_new_order } from "../controllers/send_new_order";
import { fetchAllOrders } from "../controllers/fetchAllOrders";
import { deleteOrderByClient } from "../controllers/deleteOrder";
import { fetch_sticker_finesh } from "../controllers/fetch_sticker_finesh";
import { fetchMaterials } from "../controllers/fetchMaterials";
import { fetchClientId } from "../controllers/getClientId";
import { fetchOrdersByClient } from "../controllers/fetchOrdersByClient";
import { updateOrder } from "../controllers/updateOrder";

const mainRoutes = express.Router();

mainRoutes.get('/fetchMaterials', fetchMaterials)
mainRoutes.get('/fetch_sticker_finesh', fetch_sticker_finesh)
mainRoutes.get('/fetchClientId',fetchClientId)
mainRoutes.get('/fetchOrdersByClient', fetchOrdersByClient)
mainRoutes.post('/send_new_order', send_new_order)
mainRoutes.get('/fetchAllOrders',fetchAllOrders)
mainRoutes.delete('/deleteOrderByClient/:orderId',deleteOrderByClient)
mainRoutes.put("/updateOrder/:order_id", updateOrder);



export default mainRoutes;
