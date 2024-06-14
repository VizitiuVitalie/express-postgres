import { compare } from "bcrypt";

export function verifyPassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}
