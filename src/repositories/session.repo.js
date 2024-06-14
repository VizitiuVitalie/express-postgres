import { pool } from "../config/db.js";

export class SessionRepo {

  static async create(user_id, access_token, refresh_token) {
    const result = await pool.query(
      `INSERT INTO session_tokens (user_id, access_token, refresh_token) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, access_token, refresh_token]
    );
    if (result.rows[0].length === 0) {
      return new Error("Failed to create session");
    }
    console.log("[SessionRepo.create]: ", { user_id, access_token, refresh_token });
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const result = await pool.query(
      `SELECT * FROM session_tokens WHERE user_id = $1`,
      [user_id]
    );
    if (result.rows.length === 0) {
      return new Error(`Failed to find session by user_id: ${user_id}`);
    }
    console.log("[SessionRepo.findByUserId]: ", user_id);
    return result.rows[0];
  }

  static async update(user_id, accessToken, refreshToken) {
    const result = await pool.query(
      `UPDATE session_tokens SET access_token = $1, refresh_token = $2 WHERE user_id = $3 RETURNING *`,
      [accessToken, refreshToken, user_id]
    );
    if (result.rows[0].length === 0) {
      return new Error("Failed to update tokens in session");
    }
    console.log("[SessionRepo.update]: ", {user_id, accessToken, refreshToken});
    return result.rows[0];
  }

  static async deleteAllByUserId(user_id) {
    const result = await pool.query(
      `DELETE FROM session_tokens WHERE user_id = $1`,
      [user_id]
    );
    if (result.rows.length === 0) {
      return [];
    }
    console.log("[SessionRepo.deleteByUserId]: ", user_id);
    return result.rows;
  }
}
