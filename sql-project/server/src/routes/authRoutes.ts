import express from "express";
import { getCurrentUser, login, logout, register } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getCurrentUser);
router.post("/logout", logout);

export default router;
