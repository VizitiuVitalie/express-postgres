import { hash } from 'bcrypt';

export default async function hashPassword(user_password) {
    const saltRounds = 10;
    return await hash(user_password, saltRounds);
}
