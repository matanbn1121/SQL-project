import express from "express";
import { registerClient } from "../Controllers/registerClient";
import { loginClient } from "../Controllers/loginClient";
import { fetchMaterials } from "../Controllers/fetchMaterials";

const mainRoutes = express.Router();

mainRoutes.post('/register', registerClient);
mainRoutes.post('/login', loginClient)
mainRoutes.get('/fetchMaterials', fetchMaterials)

export default mainRoutes;
