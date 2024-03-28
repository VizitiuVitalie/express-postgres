import { AccountRepo } from "../repositories/account.repo.js";
import { AuthService } from "../services/auth.service.js";

export class AccountController {
  static async createAccount(req, res) {
    try {
      const { user_name, user_email, user_password } = req.body;
      await AuthService.register({
        name: user_name,
        email: user_email,
        password: user_password,
      });
      return res.status(200).json({ message: "done" });
    } catch (error) {
      console.error("[AccountController.createAccount]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async getOneAccount(req, res) {
    const { user_id } = req.params;
    await AccountRepo.getOneAccount();
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
}
