import { Models, Query } from "react-native-appwrite";
import { databases } from "../../client";

export const getTrendingVideos = async function (): Promise<Models.Document[]> {
    try{
        const trendingVideos = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID!,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(7)
            ]
        );
        return trendingVideos.documents;
    }catch(err){
        throw err;
    }
}