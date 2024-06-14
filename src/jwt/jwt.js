import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  return jwt.sign(user, `${process.env.ACCESS_SECRET_KEY}`, {
    algorithm: "HS256",
    expiresIn: "2m",
  });
}

export function generateRefreshToken(user) {
  return jwt.sign(user, `${process.env.REFRESH_SECRET_KEY}`, {
    algorithm: "HS256",
    expiresIn: "10m",
  });
}
