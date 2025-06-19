import { ID } from "react-native-appwrite";
import { databases } from "../../client";

export const addBookmark = async (userId: string, videoId: string) => {
    try{
        return await databases.createDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID!,
            ID.unique(),
            {
                userId,
                videoId
            }
        )
    }catch(err){
        throw err;
    }
}