// hooks/useUserProfileData.ts
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { useAppwriteQuery } from "./useAppwriteQuery";
import { getTheNumberOfUserBookmarkedGags } from "@/libs/appwrite/database/gag/getTheNumberOfUserBookmarkedGags";
import { getTheNumberOfUserGags } from "@/libs/appwrite/database/gag/getTheNumberOfUserGags";
import { getUserGags } from "../libs/appwrite/database/gag/getUserGags";

export const useUserProfileData = () => {
  const { loggedInUser } = useContext(AuthContext);

  const { data: numberOfUserBookmarkedGags } = useAppwriteQuery(() =>
    getTheNumberOfUserBookmarkedGags(loggedInUser?.$id!)
  );
  const { data: numberOfUserGags } = useAppwriteQuery(() =>
    getTheNumberOfUserGags(loggedInUser?.$id!)
  );
  const { data: userGags, refetch: refetchUserGags } = useAppwriteQuery(() =>
    getUserGags(loggedInUser?.$id!)
  );

  return {
    loggedInUser,
    userGags,
    numberOfUserBookmarkedGags,
    numberOfUserGags,
    refetchUserGags,
  };
};
