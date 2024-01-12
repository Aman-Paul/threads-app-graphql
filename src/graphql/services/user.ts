import JWT from 'jsonwebtoken';

import { createHmac, randomBytes } from 'node:crypto';
import { prismaClient } from "../../lib/db";

const JWT_SECRET = 'superman_hero';

export interface CreateUserPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface GetUserTokenPayload {
    email: string,
    password: string   
}

class UserServices {

    private static generateHash(salt: string, password: string) {
        return createHmac('sha256', salt).update(password).digest('hex');
    }

    public static createUser( payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString();
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: UserServices.generateHash(salt, password),
                salt
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } });
    }

    public static async getUserToken( payload: GetUserTokenPayload ){
        const { email, password } = payload;
        const user = await UserServices.getUserByEmail(email);

        if(!user) throw new Error('User not found.');

        const userSalt = user.salt;
        const userHashedPassword = UserServices.generateHash(userSalt, password);

        if(userHashedPassword !== user.password) {
            throw new Error('Incorrect Password.');
        }

        // Generate Token
        const token = JWT.sign({id: user.id, email: user.email}, JWT_SECRET);

        return token;
    }
}

export default UserServices;