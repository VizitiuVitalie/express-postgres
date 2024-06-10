import express from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", AuthController.createAccount);
authRouter.get("/login", AuthController.login);
