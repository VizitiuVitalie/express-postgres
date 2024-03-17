import express from "express";
import AccountController from "../controllers/account.controller.js";

const accountRouter = express.Router();

accountRouter.post("/accounts", AccountController.createAccount);

export default accountRouter;
