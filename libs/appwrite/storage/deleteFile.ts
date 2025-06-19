import { storage } from "../client";

export const deleteFile = async (fileId: string) => {
    try{
        return storage.deleteFile(
            process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!,
            fileId
        )
    }catch(err){
        throw err;
    }
}
