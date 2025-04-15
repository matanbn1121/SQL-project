import express from "express";
import { registerClient } from "../Controllers/registerClient";
import { loginClient } from "../Controllers/loginClient";
import { fetchMaterials } from "../Controllers/fetchMaterials";
import { fetch_sticker_finesh } from "../Controllers/fetch_sticker_finesh";
import { fetchClientId } from "../Controllers/getClientId";

const mainRoutes = express.Router();

mainRoutes.post('/register', registerClient);
mainRoutes.post('/login', loginClient)
mainRoutes.get('/fetchMaterials', fetchMaterials)
mainRoutes.get('/fetch_sticker_finesh', fetch_sticker_finesh)
mainRoutes.get('/fetchClientId',fetchClientId)

export default mainRoutes;
