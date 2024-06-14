import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async createAccount(req, res) {
    try {
      const account = await AuthService.register({
        name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password,
      });
      console.log("[AuthController.createAccount]: successfully created account: ", account);
      return res.status(200).json(account);
    } catch (error) {
      console.error("[AuthController.createAccount]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const session = await AuthService.login({
        email: req.body.user_email,
        password: req.body.user_password,
      });
      console.log("[AuthController.login]: successfully logged in: ", session);
      return res.status(200).json(session);
    } catch (error) {
      console.error("[AuthController.login]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      const result = await AuthService.logout(req.body.user_id);
      console.log("[AuthController.logout]: successfully logged out: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.error("[AuthController.logout]:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async refreshTokens(req, res) {
    try {
      const result = await AuthService.refreshTokens(req.body.user_id, req.body.refresh_token);
      console.log("[AuthController.refreshTokens]: successfully refreshed: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.error("[AuthController.refreshTokens]:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
