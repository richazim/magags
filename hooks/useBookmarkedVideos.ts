// hooks/useBookmarkedVideos.ts
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { getUserBookmarkedGags } from "../libs/appwrite/database/gag/getUserBookmarkedGags";
import { useAppwriteQuery } from "./useAppwriteQuery";

export const useBookmarkedVideos = () => {
  const { loggedInUser } = useContext(AuthContext);
  return useAppwriteQuery(() => getUserBookmarkedGags(loggedInUser?.$id!));
};
