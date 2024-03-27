import Account from "../models/account.model";
import hashPassword from "../utils/hashPassword";
import AccountRepo from "../repositories/account.repo";

export default class AuthService {
  static async register(accountData) {
    const { user_name, user_email, user_password } = accountData;

    const hashedPassword = await hashPassword(user_password);

    const newAccount = new Account({name: user_name, email: user_email, password: hashedPassword});

    await AccountRepo.createAccount(newAccount);

    return { user_name, user_email, user_password };
  }

  static async login() {}

  static async logout() {}
}
