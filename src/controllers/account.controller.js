import AccountRepo from "../repositories/account.repo.js";

export default class AccountController {
  static async createAccount(req, res) {
    try {
      await AccountRepo.createAccount(req.body);
    } catch (error) {
      console.error("[AccountController.createAccount]:", error)
      return res.status(500)
    }
  }

  static async getOneAccount(req, res) {
    await AccountRepo.getOneAccount(req, res);
  }

  static async getAllAccounts(req, res) {
    await AccountRepo.getAllAccounts(req, res);
  }

  static async updateAccount(req, res) {
    await AccountRepo.updateAccount(req, res);
  }

  static async deleteAllAccounts(req, res) {
    await AccountRepo.deleteAllAccounts(req, res);
  }

  static async deleteOneAccount(req, res) {
    await AccountRepo.deleteOneAccount(req, res);
  }
};

