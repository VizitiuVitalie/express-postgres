import express from "express";
import { AccountController } from "../controllers/account.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

export const accountRouter = express.Router();

accountRouter.use(authenticateToken);

accountRouter.get("/accounts/:user_id", AccountController.findById);
accountRouter.get("/accounts", AccountController.findAllAccounts);
accountRouter.put("/accounts", AccountController.updateAccount);
accountRouter.delete("/accounts", AccountController.deleteAllAccounts);
accountRouter.delete("/accounts/:user_id", AccountController.deleteOneAccount);
