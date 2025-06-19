import { AppwriteException, ID } from "react-native-appwrite";
import { account } from "../client";

export const register = async function(username: string, email: string, password: string){
    try{
        const newAppwriteAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        return newAppwriteAccount;
    }catch(err){
        throw new AppwriteException("Impossible for Appwrite API to create your account");
    }
}