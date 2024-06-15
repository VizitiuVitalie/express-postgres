import { Account } from "../models/account.model.js";
import { Session } from "../models/session.model.js";
import { AccountRepo } from "../repositories/account.repo.js";
import { SessionRepo } from "../repositories/session.repo.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;

export class AuthService {
  //utils
  static async #hashPassword(password) {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }

  static async #verifyPassword(password, hashedPassword) {
    return compare(password, hashedPassword);
  }

  static async #generateAccessToken(user) {
    return sign(user, `${process.env.ACCESS_SECRET_KEY}`, {
      algorithm: "HS256",
      expiresIn: "10m",
    });
  }

  static async #generateRefreshToken(user) {
    return sign(user, `${process.env.REFRESH_SECRET_KEY}`, {
      algorithm: "HS256",
      expiresIn: "10m",
    });
  }

  //register
  static async register(input) {
    const hashedPassword = await this.#hashPassword(input.password);
    const entity = new Account({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    const account = await AccountRepo.create(entity);
    console.log("[AuthService.register]:", account);

    const registeredUser = new Account({
      id: account.user_id,
      name: account.user_name,
      email: account.user_email,
      password: account.user_password,
    }).toDTO();

    const accessToken = await this.#generateAccessToken(registeredUser);
    const refreshToken = await this.#generateRefreshToken(registeredUser);

    const session = await SessionRepo.create({
      user_id: registeredUser.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    return {
      user: registeredUser,
      session: session,
    };
  }

  //login
  static async login(account) {
    const foundAccount = await AccountRepo.findByEmail(account.email);
    if (!foundAccount) {
      throw new Error("Account not found");
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

    const loggedAccount = new Account({
      id: foundAccount.user_id,
      name: foundAccount.user_name,
      email: foundAccount.user_email,
      password: foundAccount.user_password,
    }).toDTO();

    const accessToken = await this.#generateAccessToken(loggedAccount);
    const refreshToken = await this.#generateRefreshToken(loggedAccount);

    const session = await SessionRepo.create({
      user_id: loggedAccount.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    });

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
  static async refreshTokens(user_id, refresh_token) {
    const foundSession = await SessionRepo.findByUserId(user_id);
    console.log("[AuthService.refhreshTokens.foundSession]: ", foundSession);
    if (!foundSession) {
      throw new Error(`Cannot find session by user id: ${user_id}`);
    }
    if (refresh_token !== foundSession.refresh_token) {
      throw new Error("Invalid refresh_token");
    }
    console.log("[AuthService.refreshTokens]: ", refresh_token);
    try {
      jwt.verify(refresh_token, "" + process.env.REFRESH_SECRET_KEY, {
        algorithms: ["HS256"],
      });
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const session = new Session({
      id: foundSession.session_id,
      user_id: foundSession.user_id,
      access_token: foundSession.access_token,
      refresh_token: foundSession.refresh_token,
    }).toDTO();

    const newAccessToken = await this.#generateAccessToken(session);
    const newRefreshToken = await this.#generateRefreshToken(session);
    console.log(newAccessToken);
    console.log(newRefreshToken);

    const updatedSession = await SessionRepo.updateTokens({
      user_id: user_id,
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });

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
