import {
    Account,
    AppwriteException,
    Avatars,
    Client,
    Databases,
    ID,
    ImageGravity,
    Query,
    Storage
} from "react-native-appwrite";

const client = new Client()

client
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_APPLICATION_ID)

const account = new Account(client);
const databases = new Databases(client);

const avatars = new Avatars(client);

export const getLoggedInUser = async function(){
    try{
        const loggedInUser = await account.get();

        if(loggedInUser !== null){
            const loggedInUserDocument = await databases.listDocuments(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.EXPO_PUBLIC_APPWRITE_USER_ID,
                [Query.equal("accountId", loggedInUser.$id)]
            )
            return loggedInUserDocument.documents[0];
        }
    }catch(err){
        throw new AppwriteException(err.message);
    }
}


export const login = async function (email, password){
    try{
        const loggedInUserSession = await account.createEmailPasswordSession(email, password);
        return loggedInUserSession;
    }catch(err){
        throw err;
    }
}

export const register = async function(username, email, password){
    try{
        const newAppwriteAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        return newAppwriteAccount;
    }catch(err){
        throw new AppwriteException("Impossible for Appwrite API to create your account");
    }
}

export const registerAndSaveDocumentAndLogin = async function (username, email, password){
    try{
        const newAppwriteAccount = await register(username, email, password);

        const avatarUrl = avatars.getInitials(username);

        const createdUserDocument = await databases.createDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_USER_ID,
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

export const logout = async function(){
    try{
        const deletedSession = await account.deleteSession('current');
        return deletedSession;
    }catch(err){
        throw new AppwriteException(err.message);
    }
}
//


//
export const getAllAvailableVideos = async function(){
    try{
        const availableVideos = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID
        )
        return availableVideos.documents;
    }catch(err){
        throw err;
    }
}

export const getTrendingVideos = async function () {
    try{
        const trendingVideos = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID,
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

export const searchVideosByTitle = async function(title){
    try{
        const videos = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID,
            [
                Query.search("title", title)
            ]
        )
        return videos.documents;
    }catch(err){
        throw err;
    }
}
//





const storage = new Storage(client);

const validateFile = function(fileType){
    if(fileType === "image" || fileType === "video"){
        return fileType;
    }else{
        throw new Error("Invalid file type");
    }
}

const getFileUrl = async function(fileStorageId, fileType){
    try{
        fileType = validateFile(fileType);

        let fileUrl;
        if(fileType === "image"){
            fileUrl = storage.getFilePreview(
                process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
                fileStorageId,
                2000,
                2000,
                ImageGravity.Top,
                100
            )
        }else{
            fileUrl = storage.getFileView(
                process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
                fileStorageId
            )
        }
        return fileUrl;
    }catch(err){
        throw err;
    }
}


const uploadFileAndGetFileUrlAndId = async function(fileType, file){
    try{
        const uploadedFile = await storage.createFile(
            process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
            ID.unique(),
            file
        )
        const fileUrl = await getFileUrl(uploadedFile.$id, fileType);
        const fileId = uploadedFile?.$id;
        return {fileUrl, fileId};
    }catch(err){
        throw err;
    }
}

export const createGagDocument = async function (title, thumbnail, video, description, creatorId){
    try{
        const [videoUrlAndId, thumbnailUrlAndId] = await Promise.all([
            uploadFileAndGetFileUrlAndId("video", video),
            uploadFileAndGetFileUrlAndId("image", thumbnail)
        ])
        console.log(JSON.stringify(videoUrlAndId, null, 2));

        return await databases.createDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID,
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


//


export const deleteFile = async (fileId) => {
    try{
        return storage.deleteFile(
            process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
            fileId
        )
    }catch(err){
        throw err;
    }
}

export const deleteVideoDocument = async (documentId) => {
    try{
        return await databases.deleteDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID,
            documentId
        )
    }catch(err){
        throw err;
    }
}


//


export const addBookmark = async (userId, videoId) => {
    try{
        return await databases.createDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID,
            ID.unique(),
            {
                userId,
                videoId
            }
        )
    }catch(err){
        throw err;
    }
}

export const getBookmarksRow = async (userId, videoId) => {
    try{
        const rows = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID,
            [Query.and(
                [Query.equal("userId", userId), Query.equal("videoId", videoId)]
            )]
        )
        return rows.documents[0];
    }catch(err){
        throw err;
    }
}

export const deleteBookmark = async (bookmarkId) => {
    try{
        return await databases.deleteDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID,
            bookmarkId
        )
    }catch(err){
        throw err;
    }
}

export const getUserBookmarkedGags = async (userId) => {
    try{
        const userBookmarks = await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_ID,
            [Query.equal("userId", userId)]
        )

        const videoIds = userBookmarks.documents.map(bookmark => bookmark.videoId);

        const userBookmarkedGags = await  databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID,
            [Query.contains("$id", videoIds)]
        )

        return userBookmarkedGags.documents;
    }catch(err){
        throw err;
    }
}

export const getTheNumberOfUserBookmarkedGags = async (userId) => {
    try{
        return (await getUserBookmarkedGags(userId)).length;
    }catch(err){
        return err;
    }
}

export const getUserGags = async (userId) => {
    try{
        return (await databases.listDocuments(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.EXPO_PUBLIC_APPWRITE_VIDEO_ID,
            [Query.equal("creatorId", userId)]
        )).documents;
    }catch(err){
        throw err;
    }
}

export const getTheNumberOfUserGags = async (userId) => {
    try{
        return (await getUserGags(userId)).length;
    }catch(err){
        throw err;
    }
}