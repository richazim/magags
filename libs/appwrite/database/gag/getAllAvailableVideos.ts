import { Models } from "react-native-appwrite";
import { databases } from "../../client";

export const getAllAvailableVideos = async function(): Promise<Models.Document[]>{
    try{
        const availableVideos = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID!
        )
        return availableVideos.documents;
    }catch(err){
        throw err;
    }
}