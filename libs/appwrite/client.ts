
import {
    Account,
    Avatars,
    Client,
    Databases,
    Storage
} from "react-native-appwrite";

const client = new Client()

client
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_APPLICATION_ID!)

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export {
    account, avatars, client, databases, storage
};
