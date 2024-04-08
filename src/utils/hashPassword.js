import { hash } from "bcrypt";

export function hashPassword(user_password) {
  const saltRounds = 10;
  return hash(user_password, saltRounds);
}
