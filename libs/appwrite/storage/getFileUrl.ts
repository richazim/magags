import { ImageGravity } from "react-native-appwrite";
import { storage } from "../client";
import { validateFile } from "@/utils/validateFile";

export const getFileUrl = async function(fileStorageId: string, fileType: string){
    try{
        fileType = validateFile(fileType);

        let fileUrl;
        if(fileType === "image"){
            fileUrl = storage.getFilePreview(
                process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!,
                fileStorageId,
                2000,
                2000,
                ImageGravity.Top,
                100
            )
        }else{
            fileUrl = storage.getFileView(
                process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!,
                fileStorageId
            )
        }
        return fileUrl;
    }catch(err){
        throw err;
    }
}
