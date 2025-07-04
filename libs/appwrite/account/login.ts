import { account } from "../client";

export const login = async function (email: string, password: string){
    try{
        const loggedInUserSession = await account.createEmailPasswordSession(email, password);
        return loggedInUserSession;
    }catch(err){
        throw err;
    }
}