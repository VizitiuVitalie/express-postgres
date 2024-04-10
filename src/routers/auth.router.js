import express from "express";
import { AuthService } from "../services/auth.service.js";

export const authRouter = express.Router();

authRouter.post("/login", AuthService.login);
