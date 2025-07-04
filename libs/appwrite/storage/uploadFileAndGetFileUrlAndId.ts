import * as DocumentPicker from 'expo-document-picker';
import { ID } from "react-native-appwrite";
import { storage } from "../client";
import { getFileUrl } from "./getFileUrl";

export const uploadFileAndGetFileUrlAndId = async function(fileType: string, file: DocumentPicker.DocumentPickerAsset){
    const fileForApwrite = {
        name: file.name!,
        type: file.mimeType!,
        size: file.size!,
        uri: file.uri!
    }
    try{
        const uploadedFile = await storage.createFile(
            process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!,
            ID.unique(),
            fileForApwrite
        )
        const fileUrl = await getFileUrl(uploadedFile.$id, fileType);
        const fileId = uploadedFile?.$id;
        return {fileUrl, fileId};
    }catch(err){
        throw err;
    }
}