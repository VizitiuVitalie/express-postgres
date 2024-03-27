import { sign } from "jsonwebtoken";

export default function generateToken(user_id) {
  return sign({ user_id }, process.env.ACCESS_SECRET_KEY, { expiresIn: "20s" });
}

