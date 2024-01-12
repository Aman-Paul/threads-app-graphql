import { prismaClient } from "../../lib/db";
import UserServices, { CreateUserPayload } from "../services/user";

const queries = {
    getUser: async ( _: any, { id } : { id: string }) => {
        const response = await prismaClient.user.findUnique({
            where: {
                id
            }
        });
        
        return response;
    },
    getUsers: async () => {
        const data = await prismaClient.user.findMany();
        return data;
    },
    getUserToken: async ( _: any, payload: { email: string, password: string }) => {
        const token = await UserServices.getUserToken({
            email: payload.email,
            password: payload.password
        });

        return token;
    }
};

const mutations = {
    createUser: async ( _: any, payload: CreateUserPayload ) => {
        const res = await UserServices.createUser(payload);
        return res.id;
    }
};

export const resolvers = { queries, mutations };
