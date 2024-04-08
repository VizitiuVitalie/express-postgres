import { pool } from "../config/db.js";
import { Account } from "../models/account.model.js";

export class AccountRepo {
  static async createAccount(account) {
    const result = await pool.query(
      `INSERT INTO accounts (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *`,
      [account.user_name, account.user_email, account.user_password]
    );
    if (result.rows[0].length === 0) {
      throw new Error("Unable to create new account");
    }
    console.log("repo: ", account);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT * FROM accounts WHERE user_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Cannot find account by id: " + id);
    }
    return new Account(
      result.rows[0].user_id,
      result.rows[0].user_name,
      result.rows[0].user_email,
      result.rows[0].user_password
    ).toDTO();
  }

  static async findAllAccounts() {
    const result = await pool.query(`SELECT * FROM accounts`);
    if (result.rows.length === 0) {
      return [];
    }
    const allAccountsDTO = result.rows.map((account) =>
      new Account(
        account.user_id,
        account.user_name,
        account.user_email,
        account.user_password
      ).toDTO()
    );
    return allAccountsDTO;
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
      throw new Error("Cannot update account by id: " + account.user_id);
    }

    return result.rows[0];
  }

  static async deleteAllAccounts() {
    const result = await pool.query(`DELETE FROM accounts *`);
    if (result.rows.length === 0) {
      return [];
    }
    return result.rows;
  }

  static async deleteOneAccount(id) {
    const accountToDelete = await pool.query(
      `SELECT * FROM accounts WHERE user_id = $1`,
      [id]
    );
    if (accountToDelete.rows.length === 0) {
      throw new Error("Cannot find account by id: " + id);
    }

    const result = await pool.query(
      `DELETE FROM accounts WHERE user_id = $1 RETURNING *`,
      [id]
    );

    return new Account(
      result.rows[0].user_id,
      result.rows[0].user_name,
      result.rows[0].user_email,
      result.rows[0].user_password
    ).toDTO()
  }
}
