<<<<<<< HEAD
import AccountRepo from "../repositories/account.repo.js";
import AuthService from "../services/auth.service.js";

export default class AccountController {
  static async createAccount(req, res) {
    try {
      const { user_name, user_email, user_password } = req.body;
      console.log(req.body);
      await AuthService.register({ name: user_name, email: user_email, password: user_password });
      return res.status(200).json({ message: "done" });
=======
import { AccountRepo } from "../repositories/account.repo.js";
import { AuthService } from "../services/auth.service.js";

export class AccountController {
  static async createAccount(req, res) {
    try {
      const { user_name, user_email, user_password } = req.body;
      const newAccount = await AuthService.register({
        name: user_name,
        email: user_email,
        password: user_password,
      });
      console.log("controller: ", newAccount);
      return res.status(200).json(newAccount);
>>>>>>> unstable
    } catch (error) {
      console.error("[AccountController.createAccount]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

<<<<<<< HEAD
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
=======
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

  static async deleteAllAccounts(req, res) {
    try {
      const deletedAccounts = await AccountRepo.deleteAllAccounts();
      return res.status(200).json(deletedAccounts);
    } catch (error) {
      console.error("[AccountController.deleteAllAccount]:", error);
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
>>>>>>> unstable
  }
}
