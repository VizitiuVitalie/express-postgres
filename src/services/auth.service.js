import Account from '../models/account.model.js';
import AccountRepo from '../repositories/account.repo.js';
import { hashPassword } from '../utils/hashPassword.js';

export default class AuthService {
    static async register(account) {
        const hashedPassword = await hashPassword(account.password);

        const entity = new Account(0, account.name, account.email, hashedPassword)

        await AccountRepo.createAccount(entity);

        return entity.toDTO()
    }

    static async login() {

    }

    static async logout() {

    }

}
