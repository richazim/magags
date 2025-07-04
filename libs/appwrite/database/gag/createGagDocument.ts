import * as DocumentPicker from 'expo-document-picker';
import { ID, Models } from "react-native-appwrite";
import { databases } from "../../client";
import { uploadFileAndGetFileUrlAndId } from "../../storage/uploadFileAndGetFileUrlAndId";

export const createGagDocument = async function (title: string, thumbnail: DocumentPicker.DocumentPickerAsset | null, video: DocumentPicker.DocumentPickerAsset | null, description: string, creatorId: string): Promise<Models.Document | null>{
    if(!video || !thumbnail) throw new Error("Missing video or thumbnail");
    try{
        const [videoUrlAndId, thumbnailUrlAndId] = await Promise.all([
            uploadFileAndGetFileUrlAndId("video", video),
            uploadFileAndGetFileUrlAndId("image", thumbnail)
        ])

        return await databases.createDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID!,
            ID.unique(),
            {
                title,
                thumbnailUrl: thumbnailUrlAndId.fileUrl,
                videoUrl: videoUrlAndId.fileUrl,
                description,
                creatorId: creatorId,
                videoStorageId: videoUrlAndId.fileId,
                thumbnailStorageId: thumbnailUrlAndId.fileId
            }
        )
    }catch(err){
        throw err;
    }
}
