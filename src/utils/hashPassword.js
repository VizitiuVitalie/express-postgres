import { hash } from "bcrypt";

<<<<<<< HEAD
export default async function hashPassword(user_password) {
  const saltRounds = 10;
  return await hash(user_password, saltRounds);
=======
export function hashPassword(user_password) {
  const saltRounds = 10;
  return hash(user_password, saltRounds);
>>>>>>> unstable
}
