import { hashPassword } from "../utils/hashPassword";
import AccountRepo from "../repositories/account.repo";
import AccountController from "../controllers/account.controller";
import Account from "../models/account.model";

export default class AuthService {
    static async register(newAccount) {
        const newAccount = new Account(user_name, user_email, user_password);
        const hashedPassword = await hashPassword(user_password);
        const createdAccount = await AccountRepo.createAccount(newAccount, newAccount.user_password=hashedPassword)
        return createdAccount
    }

    static async login() {

    }

    static async logout() {

    }

}