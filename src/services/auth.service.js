import { hashPassword } from "../utils/hashPassword";
import AccountController from "../controllers/account.controller";
import AccountRepo from "../repositories/account.repo";
import Account from "../models/account.model";

export default class AuthService {
    static async register(accountData) {
        const { user_name, user_email, user_password } = accountData;

        const hashedPassword = await hashPassword(user_password);

        const newAccount = new Account(user_name, user_email, hashedPassword)

        await AccountController.createAccount(newAccount);

        return { user_name, user_email };
    }

    static async login() {

    }

    static async logout() {

    }

}