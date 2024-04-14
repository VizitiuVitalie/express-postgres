import jwt from "jsonwebtoken";
import axios from "axios";

export function generateAccessToken(user) {
  return jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "1m",
  });
}

export function generateRefreshToken(user) {
  return jwt.sign(user, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "10m",
  });
}

export function refreshAccessToken(refreshToken) {
 
}
