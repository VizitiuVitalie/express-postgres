import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  return jwt.sign(user, `${process.env.ACCESS_SECRET_KEY}`, {
    expiresIn: "5m",
  });
}

export function generateRefreshToken(user) {
  return jwt.sign(user, `${process.env.REFRESH_SECRET_KEY}`, {
    expiresIn: "10m",
  });
}

export function refreshAccessToken(refreshToken) {}
