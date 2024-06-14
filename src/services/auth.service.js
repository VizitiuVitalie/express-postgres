import { Account } from "../models/account.model.js";
import { AccountRepo } from "../repositories/account.repo.js";
import { SessionRepo } from "../repositories/session.repo.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateAccessToken, generateRefreshToken } from "../jwt/jwt.js";
import { verifyPassword } from "../utils/verifyPassword.js";
import dotenv from "dotenv";

dotenv.config();


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
    console.log("auth_service:", savedAccount);

    const registeredUser = new Account(
      savedAccount.user_id,
      savedAccount.user_name,
      savedAccount.user_email,
      savedAccount.user_password
    ).toDTO();

    const accessToken = generateAccessToken(registeredUser);
    const refreshToken = generateRefreshToken(registeredUser);

    const savedSession = await SessionRepo.createSession(
      registeredUser.user_id,
      accessToken,
      refreshToken
    );

    return {
      user: registeredUser,
      session: savedSession,
    };
  }

  //login
  static async login(account) {
    const foundByEmail = await AccountRepo.findByEmail(account.email);
    if (!foundByEmail) {
      throw new Error("Invalid email or password");
    }
    const passwordMatch = await verifyPassword(
      account.password,
      foundByEmail.user_password
    );
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const foundSession = await SessionRepo.findSessionByUserId(
      foundByEmail.user_id
    );

    if (foundSession) {
      await SessionRepo.deleteSessionByUserId(foundSession.user_id);
    }

    const loggedUser = new Account(
      foundByEmail.user_id,
      foundByEmail.user_name,
      foundByEmail.user_email,
      foundByEmail.user_password
    ).toDTO();

    const accessToken = generateAccessToken(loggedUser);
    const refreshToken = generateRefreshToken(loggedUser);

    const savedSession = await SessionRepo.createSession(
      loggedUser.user_id,
      accessToken,
      refreshToken
    );

    return {
      user: loggedUser,
      session: savedSession,
    };
  }

  //logout
  static async logout(user_id) {
    const deletedSession = await SessionRepo.deleteSessionByUserId(user_id);
    return deletedSession;
  }

  static async refreshTokens(user_id, oldRefreshToken) {
    const session = SessionRepo.findSessionByUserId(user_id);
    if (!session) {
      throw new Error("Session not found");
    }
    console.log("[OldRefreshToken]: ", oldRefreshToken);
    console.log("[REFRESH_SECRET_KEY]: ", process.env.REFRESH_SECRET_KEY);
    try {
      jwt.verify(oldRefreshToken, process.env.REFRESH_SECRET_KEY, { algorithms: ['HS256'] });
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(session);
    const newRefreshToken = generateRefreshToken(session);

    const updatedSession = await SessionRepo.updateSessionTokens(
      user_id,
      newAccessToken,
      newRefreshToken
    );

    return updatedSession;
  }

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
