import express from "express";
import { AccountController } from "../controllers/account.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

export const accountRouter = express.Router();

accountRouter.use(authenticateToken);

accountRouter.get("/:user_id", AccountController.findById);
accountRouter.get("/", AccountController.findAll);
accountRouter.put("/", AccountController.updateAccount);
accountRouter.delete("/", AccountController.deleteAll);
accountRouter.delete("/:user_id", AccountController.deleteOneAccount);
