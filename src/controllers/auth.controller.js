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

  static async logout(req, res) {
    try {
      const { user_id } = req.body;
      const loggedOutUser = await AuthService.logout(user_id);
      return res.status(200).json(loggedOutUser);
    } catch (error) {
      console.error("[AuthController.logout]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async refreshTokens(req, res) {
    try {
      const { user_id, refresh_token } = req.body;
      const newTokens = await AuthService.refreshTokens(user_id, refresh_token);
      return res.status(200).json(newTokens);
    } catch (error) {
      console.error("[AuthController.refreshTokens]:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
