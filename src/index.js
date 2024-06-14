import express from "express";
import dotenv from "dotenv";
import { accountRouter } from "./routers/account.router.js";
import { authRouter } from "./routers/auth.router.js";

dotenv.config();

const PORT = process.env.PORT || 4002;
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
