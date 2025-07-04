import { databases } from "../../client";

export const deleteVideoDocument = async (documentId: string) => {
    try{
        return await databases.deleteDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID!,
            documentId
        )
    }catch(err){
        throw err;
    }
}