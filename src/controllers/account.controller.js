import { AccountRepo } from "../repositories/account.repo.js";
import { AuthService } from "../services/auth.service.js";

export class AccountController {

  static async findById(req, res) {
    try {
      const { user_id } = req.params;
      const foundedById = await AccountRepo.findById(user_id);
      return res.status(200).json(foundedById);
    } catch (error) {
      console.error("[AccountController.findById]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async findAllAccounts(req, res) {
    try {
      const allAccounts = await AccountRepo.findAllAccounts();
      return res.status(200).json(allAccounts);
    } catch (error) {
      console.error("[AccountController.findAllAccounts]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateAccount(req, res) {
    try {
      const updatedAccount = await AuthService.update(req.body);
      return res.status(200).json(updatedAccount);
    } catch (error) {
      console.error("[AccountController.updateAccount]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteOneAccount(req, res) {
    try {
      const { user_id } = req.params;
      const deletedAccount = await AccountRepo.deleteOneAccount(user_id);
      return res.status(200).json(deletedAccount);
    } catch (error) {
      console.error("[AccountController.deleteOneAccount]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteAllAccounts(req, res) {
    try {
      const deletedAccounts = await AccountRepo.deleteAllAccounts();
      return res.status(200).json(deletedAccounts);
    } catch (error) {
      console.error("[AccountController.deleteAllAccount]:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
