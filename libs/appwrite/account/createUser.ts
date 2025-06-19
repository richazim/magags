import { ID } from "react-native-appwrite";
import { avatars, databases } from "../client";
import { login } from "./login";
import { register } from "./register";

export const registerAndSaveDocumentAndLogin = async function (username: string, email: string, password: string){
    try{
        const newAppwriteAccount = await register(username, email, password);

        const avatarUrl = avatars.getInitials(username);

        const createdUserDocument = await databases.createDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_USER_ID!,
            ID.unique(),
            {
                "username": username,
                "email": email,
                "avatarUrl": avatarUrl,
                "accountId": newAppwriteAccount.$id
            }
        )

        await login(email, password);

        return createdUserDocument;
    }catch(err){
        throw err;
    }
}