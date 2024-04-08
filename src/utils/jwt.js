import { sign } from "jsonwebtoken";

<<<<<<< HEAD
export default function generateToken(user_id) {
=======
export function generateToken(user_id) {
>>>>>>> unstable
  return sign({ user_id }, process.env.ACCESS_SECRET_KEY, { expiresIn: "20s" });
}

