import express from "express";
import { fetchMaterials } from "../Controllers/fetchMaterials";
import { fetch_sticker_finesh } from "../Controllers/fetch_sticker_finesh";
import { fetchClientId } from "../Controllers/getClientId";
import { fetchOrdersByClient } from "../Controllers/fetchOrdersByClient";
import { send_new_order } from "../controllers/send_new_order";
import { fetchAllOrders } from "../controllers/fetchAllOrders";

const mainRoutes = express.Router();

mainRoutes.get('/fetchMaterials', fetchMaterials)
mainRoutes.get('/fetch_sticker_finesh', fetch_sticker_finesh)
mainRoutes.get('/fetchClientId',fetchClientId)
mainRoutes.get('/fetchOrdersByClient', fetchOrdersByClient)
mainRoutes.post('/send_new_order', send_new_order)
mainRoutes.get('/fetchAllOrders',fetchAllOrders)

export default mainRoutes;
