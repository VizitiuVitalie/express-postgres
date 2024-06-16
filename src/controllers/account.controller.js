import { AccountRepo } from "../repositories/account.repo.js";
import { AuthService } from "../services/auth.service.js";

export class AccountController {
  
  static async findById(req, res) {
    try {
      const foundedById = await AccountRepo.findById(req.params.user_id);
      console.log("[AccountController.findById]: successfully found: ", foundedById);
      return res.status(200).json(foundedById);
    } catch (error) {
      console.error("[AccountController.findById]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const allAccounts = await AccountRepo.findAll();
      console.log("[AccountController.findAll]: successfully found: ", allAccounts);
      return res.status(200).json(allAccounts);
    } catch (error) {
      console.error("[AccountController.findAll]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateAccount(req, res) {
    try {
      const updatedAccount = await AuthService.update(req.body);
      console.log("[AccountController.updateAccount]: successfully updated: ", updatedAccount);
      return res.status(200).json(updatedAccount);
    } catch (error) {
      console.error("[AccountController.updateAccount]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async accountToDelete(req, res) {
    try {
      const deletedAccount = await AccountRepo.accountToDelete(req.params.user_id);
      console.log("[AccountController.accountToDelete]: successfully deleted: ", deletedAccount);
      return res.status(200).json(deletedAccount);
    } catch (error) {
      console.error("[AccountController.accountToDelete]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      const deletedAccounts = await AccountRepo.deleteAll();
      console.log("[AccountController.deleteAll]: successfully deleted: ", deletedAccounts);
      return res.status(200).json(deletedAccounts);
    } catch (error) {
      console.error("[AccountController.deleteAll]:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
