import { sign } from "jsonwebtoken";

function generateToken(user_id) {
  return sign({ user_id }, process.env.ACCESS_SECRET_KEY, { expiresIn: "20s" });
}

export default generateToken
