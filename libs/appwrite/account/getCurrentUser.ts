import { Models } from "react-native-appwrite";
import { account } from "../client";

export const getCurrentUser = async (): Promise<Models.User<Models.Preferences>> => {
    return await account.get();
  };