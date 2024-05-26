import { AuthService } from "../services/auth.service.js";

export class AuthController {
  
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
    } catch (error) {
      console.error("[AuthController.createAccount]:", error);
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async login(req, res) {
    try {
      const { user_email, user_password } = req.body;
      const getTokensForUser = await AuthService.login({
        email: user_email,
        password: user_password,
      });
      
      return res.status(200).json(getTokensForUser);
    } catch (error) {
      console.error("[AuthController.login]:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
