import { AppwriteException, Models, Query } from "react-native-appwrite";
import { databases } from "../client";
import { getCurrentUser } from "./getCurrentUser";

export const getLoggedInUser = async function(): Promise<Models.Document | null>{
    try{
        const loggedInUser = await getCurrentUser();

        if(loggedInUser !== null){
            const loggedInUserDocument = await databases.listDocuments(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.EXPO_PUBLIC_APPWRITE_USER_ID!,
                [Query.equal("accountId", loggedInUser.$id)]
            )
            return loggedInUserDocument.documents[0];
        }
        return null;
    }catch(err: any){
        throw new AppwriteException(err.message);
    }
}