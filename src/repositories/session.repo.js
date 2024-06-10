import { pool } from "../config/db.js";

export class SessionRepo {
  static async createSession(user_id, access_token, refresh_token) {
    const result = await pool.query(
      `INSERT INTO session_tokens (user_id, access_token, refresh_token) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, access_token, refresh_token]
    );
    if (result.rows[0].length === 0) {
      throw new Error("Unable to create session");
    }
    console.log("session_repo: ", { user_id, access_token, refresh_token });
    return result.rows[0];
  }
  static async findSessionByUserId(user_id) {
    const result = await pool.query(
      `SELECT * FROM session_tokens WHERE user_id = $1`,
      [user_id]
    );
    if (result.rows.length === 0) {
      throw new Error("Unable to find session by user_id");
    }
    return result.rows[0];
  }

  static async deleteSessionByUserId(user_id) {
    const result = await pool.query(
      `DELETE FROM session_tokens WHERE user_id = $1`,
      [user_id]
    );
    return result.rows[0];
  }
}
