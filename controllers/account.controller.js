import AccountRepo from "../repositories/account.repo.js";

const AccountController = {
  async createAccount(req, res) {
    try {
      await AccountRepo.createAccount(req, res);
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default AccountController;