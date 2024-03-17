import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  user: "postgres",
  password: "28uU1w6D",
  host: "localhost",
  port: process.env.PORT || 4002,
  database: "pg_rest_practice",
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

export default pool;
