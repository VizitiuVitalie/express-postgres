import { Account } from "../models/account.model.js";
import { AccountRepo } from "../repositories/account.repo.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateAccessToken, generateRefreshToken } from "../jwt/jwt.js";

export class AuthService {
  //register
  static async register(account) {
    const hashedPassword = await hashPassword(account.password);

    const entity = new Account(
      null,
      account.name,
      account.email,
      hashedPassword
    );

    const savedAccount = await AccountRepo.createAccount(entity);
    console.log("service:", savedAccount);
    return new Account(
      savedAccount.user_id,
      savedAccount.user_name,
      savedAccount.user_email,
      savedAccount.user_password
    ).toDTO();
  }

  //login
  static async login(email, password) {
    const account = await AccountRepo.findByEmail(email);
    if (!account) {
      throw new Error("Invalid email or password");
    }
    const passwordMatch = await verifyPassword(password, account.user_password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }
    const accessToken = generateAccessToken(account);
    const refreshToken = generateRefreshToken(account);

    return { accessToken, refreshToken, account };
  }

  //logout
  static async logout() {}

  //update
  static async update(account) {
    const hashedPassword = await hashPassword(account.user_password);

    const entity = new Account(
      account.user_id,
      account.user_name,
      account.user_email,
      hashedPassword
    );

    const updatedAccount = await AccountRepo.updateAccount(entity);
    return new Account(
      updatedAccount.user_id,
      updatedAccount.user_name,
      updatedAccount.user_email,
      updatedAccount.user_password
    ).toDTO();
  }
}