import pool from "../config/db.js";

class AccountRepo {
  static async createAccount(req, res) {
    try {
      const { user_name, user_email, user_password } = req.body;
      const newAccount = await pool.query(
        `INSERT INTO accounts (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *`,
        [user_name, user_email, user_password]
      );
      res.status(200).json(newAccount.rows[0]);
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default AccountRepo;
