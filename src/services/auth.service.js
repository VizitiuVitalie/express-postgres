import { hashPassword } from "../utils/hashPassword";
import AccountController from "../controllers/account.controller";
import AccountRepo from "../repositories/account.repo";
import Account from "../models/account.model";

export default class AuthService {
    static async register(accountData) {
         const hashedPassword = await hashPassword(accountData.user_password);

         const newAccount = new Account(accountData.user_name, accountData.user_email, hashedPassword);
 
         const createdAccount = await AccountController.createAccount(newAccount);
 
         return createdAccount;
     }

    static async login() {

    }

    static async logout() {

    }

}