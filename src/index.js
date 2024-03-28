import express from "express";
import dotenv from "dotenv";
import { accountRouter } from "./routers/account.router.js";

dotenv.config();

const PORT = process.env.PORT || 4002;
const app = express();

app.use(express.json());

app.use("/api", accountRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
