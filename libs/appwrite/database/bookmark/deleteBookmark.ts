import { databases } from "../../client";

export const deleteBookmark = async (bookmarkId: string) => {
    try{
        return await databases.deleteDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID!,
            bookmarkId
        )
    }catch(err){
        throw err;
    }
}