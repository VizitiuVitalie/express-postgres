import pool from "../config/db.js";
import hashPassword from "../utils/hashPassword.js";

class AccountRepo {
  static async createAccount(req, res) {
    try {
      const { user_name, user_email, user_password } = req.body;
      const hashedPassword = await hashPassword(user_password);
      const newAccount = await pool.query(
        `INSERT INTO accounts (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *`,
        [user_name, user_email, hashedPassword]
      );
      if (newAccount.rows.length === 0) {
        return res.status(500).json({ error: "Failed to create account" });
      }
      res.status(200).json(newAccount.rows[0]);
    } catch (error) {
      console.error("Error creating account:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error while creating account" });
    }
  }

  static async getOneAccount(req, res) {
    try {
      const { user_id } = req.params;
      const oneAccount = await pool.query(
        `SELECT * FROM accounts WHERE user_id = $1`,
        [user_id]
      );
      if (oneAccount.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Account with specified ID not found" });
      }
      res.status(200).json(oneAccount.rows[0] || {});
    } catch (error) {
      console.error("Error getting account:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error while getting account" });
    }
  }

  static async getAllAccounts(req, res) {
    try {
      const allAccounts = await pool.query(`SELECT * FROM accounts`);
      if (allAccounts.rows.length === 0) {
        return res.status(404).json({ error: "No accounts found" });
      }
      res.status(200).json(allAccounts.rows);
    } catch (error) {
      console.error("Error getting all accounts:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error while getting all accounts" });
    }
  }

  static async updateAccount(req, res) {
    try {
      const { user_name, user_email, user_password, user_id } = req.body;
      const updatedAccount = await pool.query(
        `UPDATE accounts SET user_name = $1, user_email = $2, user_password = $3 WHERE user_id = $4 RETURNING *`,
        [user_name, user_email, user_password, user_id]
      );
      if (updatedAccount.rows.length === 0) {
        res.status(404).json({ error: "Account not found" });
      }
      res.json(updatedAccount.rows[0]);
    } catch (error) {
      console.error("Error updating account:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error while updating account" });
    }
  }

  static async deleteAllAccounts(req, res) {
    try {
      await pool.query(`DELETE FROM accounts *`);
      res.status(200).json({ message: "All accounts are deleted succesfully" });
    } catch (error) {
      console.error("Error delete all accounts:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error while delete all accounts" });
    }
  }

  static async deleteOneAccount(req, res) {
    try {
      const { user_id } = req.params;
      await pool.query(`DELETE FROM accounts WHERE user_id = $1`, [user_id]);
      res
        .status(200)
        .json({ message: "Account has been deleted successfully" });
    } catch (error) {
      console.error("Error delete account:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error while delete account" });
    }
  }
}

export default AccountRepo;
