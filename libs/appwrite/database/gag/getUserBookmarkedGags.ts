import { Query } from "react-native-appwrite";
import { databases } from "../../client";

export const getUserBookmarkedGags = async (userId: string) => {
    try{
        const userBookmarks = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID!,
            [Query.equal("userId", userId)]
        )

        const videoIds = userBookmarks.documents.map(bookmark => bookmark.videoId);

        const userBookmarkedGags = await  databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID!,
            [Query.contains("$id", videoIds)]
        )

        return userBookmarkedGags.documents;
    }catch(err){
        throw err;
    }
}