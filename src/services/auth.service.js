import { Account } from "../models/account.model.js";
import { AccountRepo } from "../repositories/account.repo.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateAccessToken, generateRefreshToken } from "../jwt/jwt.js";
import { verifyPassword } from "../utils/verifyPassword.js";

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
  static async login(account) {
    const findedByEmail = await AccountRepo.findByEmail(account.email);
    if (!findedByEmail) {
      throw new Error("Invalid email or password");
    }
    const passwordMatch = await verifyPassword(
      account.password,
      findedByEmail.user_password
    );
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const loggedUser = new Account(
      findedByEmail.user_id,
      findedByEmail.user_name,
      findedByEmail.user_email
    ).toDTO();

    const accessToken = generateAccessToken(loggedUser);
    const refreshToken = generateRefreshToken(loggedUser);

    return {
      user: loggedUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
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
