import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

dotenv.config();

export const pool = new Pool({
  user: "postgres",
  password: "28uU1w6D",
  host: "localhost",
  port: process.env.DB_PORT,
  database: "pg_rest_practice",
});
