import AccountRepo from "../repositories/account.repo.js";

export default class AccountController {
  static async createAccount(req, res) {
    try {
      const { user_name, user_email, user_password } = req.body; // получаем данные учетной записи из тела запроса
      await AccountRepo.createAccount({ user_name, user_email, user_password }); // передаем данные учетной записи
      return res.status(200).json({ message: "done" });
    } catch (error) {
      console.error("[AccountController.createAccount]:", error);
      return res.status(500).json({ error: error.message }); // возвращаем ошибку в виде JSON
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
