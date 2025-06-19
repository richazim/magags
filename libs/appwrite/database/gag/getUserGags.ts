import { Query } from "react-native-appwrite";
import { databases } from "../../client";

export const getUserGags = async (userId: string) => {
    try{
        return (await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID!,
            [Query.equal("creatorId", userId)]
        )).documents;
    }catch(err){
        throw err;
    }
}