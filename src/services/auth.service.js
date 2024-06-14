import { Account } from "../models/account.model.js";
import { Session } from "../models/session.model.js";
import { AccountRepo } from "../repositories/account.repo.js";
import { SessionRepo } from "../repositories/session.repo.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  //utils
  static #hashPassword(password) {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }

  static #verifyPassword(password, hashedPassword) {
    return compare(password, hashedPassword);
  }

  static #generateAccessToken(user) {
    return sign(user, `${process.env.ACCESS_SECRET_KEY}`, {
      algorithm: "HS256",
      expiresIn: "10m",
    });
  }

  static #generateRefreshToken(user) {
    return sign(user, `${process.env.REFRESH_SECRET_KEY}`, {
      algorithm: "HS256",
      expiresIn: "10m",
    });
  }

  //register
  static async register(input) {
    const hashedPassword = await this.#hashPassword(input.password);

    const entity = new Account(
      input.id,
      input.name,
      input.email,
      hashedPassword
    );

    const account = await AccountRepo.create(entity);
    console.log("[AuthService.register]:", account);

    const registeredUser = new Account(
      account.user_id,
      account.user_name,
      account.user_email,
      account.user_password
    ).toDTO();

    const accessToken = this.#generateAccessToken(registeredUser);
    const refreshToken = this.#generateRefreshToken(registeredUser);

    const session = await SessionRepo.create(
      registeredUser.user_id,
      accessToken,
      refreshToken
    );

    return {
      user: registeredUser,
      session: session,
    };
  }

  //login
  static async login(account) {
    const foundAccount = await AccountRepo.findByEmail(account.email);
    if (!foundAccount) {
      throw new Error("Invalid email or password");
    }
    const matched = await this.#verifyPassword(
      account.password,
      foundAccount.user_password
    );
    if (!matched) {
      throw new Error("Invalid email or password");
    }

    const foundSession = await SessionRepo.findByUserId(foundAccount.user_id);

    if (foundSession) {
      await SessionRepo.deleteAllByUserId(foundSession.user_id);
    }

    const loggedAccount = new Account(
      foundAccount.user_id,
      foundAccount.user_name,
      foundAccount.user_email,
      foundAccount.user_password
    ).toDTO();

    const accessToken = this.#generateAccessToken(loggedAccount);
    const refreshToken = this.#generateRefreshToken(loggedAccount);

    const session = await SessionRepo.create(
      loggedAccount.user_id,
      accessToken,
      refreshToken
    );

    return {
      user: loggedAccount,
      session: session,
    };
  }

  //logout
  static async logout(user_id) {
    return SessionRepo.deleteAllByUserId(user_id);
  }

  //refresh
  static async refreshTokens(user_id, refreshToken) {
    const foundSession = await SessionRepo.findByUserId(user_id);
    console.log("[AuthService.refhreshTokens.foundSession]: ", foundSession);
    if (!foundSession) {
      throw new Error(`Cannot find session by user id: ${user_id}`);
    }
    console.log("[AuthService.refreshTokens]: ", refreshToken);
    try {
      jwt.verify(refreshToken, "" + process.env.REFRESH_SECRET_KEY, {
        algorithms: ["HS256"],
      });
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const session = new Session(
      foundSession.session_id,
      foundSession.user_id,
      foundSession.access_token,
      foundSession.refresh_token
    ).toDTO();

    const newAccessToken = this.#generateAccessToken(session);
    const newRefreshToken = this.#generateRefreshToken(session);
    console.log(newAccessToken);
    console.log(newRefreshToken);

    const updatedSession = await SessionRepo.updateSessionTokens(
      user_id,
      newAccessToken,
      newRefreshToken
    );

    return updatedSession;
  }

  //update
  static async update(account) {
    const hashedPassword = await this.#hashPassword(account.user_password);

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
