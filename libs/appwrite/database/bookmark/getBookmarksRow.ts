import { Query } from "react-native-appwrite";
import { databases } from "../../client";

export const getBookmarksRow = async (userId: string, videoId: string) => {
    try{
        const rows = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID!,
            [Query.and(
                [Query.equal("userId", userId), Query.equal("videoId", videoId)]
            )]
        )
        return rows.documents[0];
    }catch(err){
        throw err;
    }
}