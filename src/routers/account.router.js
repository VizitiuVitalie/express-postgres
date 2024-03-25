import express from "express";
import AccountController from "../controllers/account.controller.js";

const accountRouter = express.Router();

accountRouter.post("/accounts", AccountController.createAccount);
accountRouter.get("/accounts/:user_id", AccountController.getOneAccount);
accountRouter.get("/accounts", AccountController.getAllAccounts);
accountRouter.put("/accounts", AccountController.updateAccount);
accountRouter.delete("/accounts", AccountController.deleteAllAccounts);
accountRouter.delete("/accounts/:user_id", AccountController.deleteOneAccount);

export default accountRouter;
