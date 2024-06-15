import { pool } from "../config/db.js";
import { Account } from "../models/account.model.js";

export class AccountRepo {
  
  static async create(account) {
    const result = await pool.query(
      `INSERT INTO accounts (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *`,
      [account.name, account.email, account.password]
    );
    if (result.rows[0].length === 0) {
      return new Error("Failed to insert account");
    }
    console.log("[AccountRepo.create]: ", account);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT * FROM accounts WHERE user_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return new Error(`Failed to find account by id: ${id}`);
    }
    console.log("[AccountRepo.findById]: ", id);
    return new Account(
      result.rows[0].user_id,
      result.rows[0].user_name,
      result.rows[0].user_email,
      result.rows[0].user_password
    ).toDTO();
  }

  static async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM accounts WHERE user_email = $1`,
      [email]
    );
    if (result.rows.length === 0) {
      return undefined;
    }
    console.log("[AccountRepo.findByEmail]: ", email);
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query(`SELECT * FROM accounts`);
    if (result.rows.length === 0) {
      return [];
    }
    console.log("[AccountRepo.findAll]: ", result);
    return result.rows.map((account) => {
      new Account(
        account.user_id,
        account.user_name,
        account.user_email,
        account.user_password
      ).toDTO();
    });
  }

  static async updateAccount(account) {
    const result = await pool.query(
      `UPDATE accounts SET user_name = $1, user_email = $2, user_password = $3 WHERE user_id = $4 RETURNING *`,
      [
        account.user_name,
        account.user_email,
        account.user_password,
        account.user_id,
      ]
    );

    if (result.rows[0] === undefined) {
      return new Error(`Failed to update account by id: ${account.user_id}`);
    }
    console.log("[AccountRepo.updateAccount]: ", account);
    return result.rows[0];
  }

  static async deleteAll() {
    const result = await pool.query(`DELETE FROM accounts *`);
    if (result.rows.length === 0) {
      return [];
    }
    console.log("[AccountRepo.deleteAll]: ", result);
    return result.rows;
  }

  static async accountToDelete(id) {
    const account = await pool.query(
      `SELECT * FROM accounts WHERE user_id = $1`,
      [id]
    );
    if (account.rows.length === 0) {
      return new Error(`Filed to find account by id: ${id}`);
    }
    const result = await pool.query(
      `DELETE FROM accounts WHERE user_id = $1 RETURNING *`,
      [id]
    );
    if (!result) {
      return new Error(`Failed to delete account by id: ${id}`)
    }
    console.log("[AccountRepo.accountToDelete]: ", id);
    return new Account(
      result.rows[0].user_id,
      result.rows[0].user_name,
      result.rows[0].user_email,
      result.rows[0].user_password
    ).toDTO();
  }
}
