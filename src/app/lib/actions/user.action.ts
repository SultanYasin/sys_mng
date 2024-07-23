'use server'
import { Query,ID } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async(user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        )
    } catch (error: any) {
        if(error && error?.code===409){
            const documents= await users.list([ // document = existingUSer
                Query.equal('email',[user.email] ) // finding user if exists
            ])
            return documents?.users[0];
        }
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error) {
        console.error(error);
    }
}