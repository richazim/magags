import { AppwriteException } from "react-native-appwrite";
import { account } from "../client";

export const logout = async function(){
    try{
        const deletedSession = await account.deleteSession('current');
        return deletedSession;
    }catch(err: any){
        throw new AppwriteException(err.message);
    }
}