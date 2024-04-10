import express from "express";
import {AccountController} from '../controllers/account.controller.js';
import { AuthController } from "../controllers/auth.controller.js";

export const accountRouter = express.Router();

accountRouter.post("/accounts", AuthController.createAccount);
accountRouter.get("/accounts/:user_id", AccountController.findById);
accountRouter.get("/accounts", AccountController.findAllAccounts);
accountRouter.put("/accounts", AccountController.updateAccount);
accountRouter.delete("/accounts", AccountController.deleteAllAccounts);
accountRouter.delete("/accounts/:user_id", AccountController.deleteOneAccount);

