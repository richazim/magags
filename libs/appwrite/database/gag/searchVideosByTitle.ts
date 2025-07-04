import { Query } from "react-native-appwrite";
import { databases } from "../../client";

export const searchVideosByTitle = async function(title: string){
    try{
        const videos = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID!,
            [
                Query.search("title", title)
            ]
        )
        return videos.documents;
    }catch(err){
        throw err;
    }
}