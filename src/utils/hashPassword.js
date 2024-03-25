import { hash } from 'bcrypt';

async function hashPassword(user_password) {
    const saltRounds = 10;
    return await hash(user_password, saltRounds);
}

export default hashPassword