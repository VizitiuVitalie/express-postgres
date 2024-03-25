import {
  StatusCodes,
} from 'http-status-codes';
import AccountRepo from "../repositories/account.repo.js";

const AccountController = {
  async createAccount(req, res) {
    try {
      await AccountRepo.createAccount(req.body);
    } catch (e) {
      console.error("[AccountController.createAccount]: failed to create account")
      return res.status(StatusCodes.BAD_REQUEST)
    }
  },

  async getOneAccount(req, res) {
    await AccountRepo.getOneAccount(req, res);
  },

  async getAllAccounts(req, res) {
    await AccountRepo.getAllAccounts(req, res);
  },

  async updateAccount(req, res) {
    await AccountRepo.updateAccount(req, res);
  },

  async deleteAllAccounts(req, res) {
    await AccountRepo.deleteAllAccounts(req, res);
  },

  async deleteOneAccount(req, res) {
    await AccountRepo.deleteOneAccount(req, res);
  },
};

export default AccountController;
