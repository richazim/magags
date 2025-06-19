import AuthContext from "@/context/AuthContext";
import { addBookmark } from "@/libs/appwrite/database/bookmark/addBookmark";
import { deleteBookmark } from "@/libs/appwrite/database/bookmark/deleteBookmark";
import { getBookmarksRow } from "@/libs/appwrite/database/bookmark/getBookmarksRow";
import { deleteVideoDocument } from "@/libs/appwrite/database/gag/deleteVideoDocument";
import { deleteFile } from "@/libs/appwrite/storage/deleteFile";
import { useVideoPlayer } from "expo-video";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type VideoCardControllerProps = {
  videoUrl: string;
  videoStorageId: string;
  thumbnailUrl?: string;
  thumbnailStorageId?: string;
  id: string;
  creatorId: string;
  refresher?: () => Promise<void>;
}

export function useVideoCardController({
  videoUrl,
  videoStorageId,
  thumbnailUrl,
  thumbnailStorageId,
  id,
  creatorId,
  refresher,
}: VideoCardControllerProps) {

  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkDocument, setBookmarkDocument] = useState<any>(null);
  const [menuOpened, setMenuOpened] = useState(false);
  
  const player = useVideoPlayer(videoUrl);
  const { loggedInUser } = useContext(AuthContext);
  

  const saveGag = async () => {
    try {
      const addedBookmark = await addBookmark(loggedInUser?.$id!, id);
      if (addedBookmark) {
        setBookmarked(true);
        setBookmarkDocument(addedBookmark);
      }
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const unbookmarkGag = async () => {
    try {
      const deletedBookmark = await deleteBookmark(bookmarkDocument.$id);
      if (deletedBookmark) {
        setBookmarked(false);
        setBookmarkDocument(null);
      }
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const deleteGag = async () => {
    try {
      await deleteFile(videoStorageId);
      if (thumbnailUrl) {
        await deleteFile(thumbnailStorageId!);
      }
      const deletedDocument = await deleteVideoDocument(id);
      if (deletedDocument && refresher) {
        await refresher();
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const checkIfVideoIsBookmarked = async () => {
      try {
        const result = await getBookmarksRow(loggedInUser?.$id!, id);
        if (result) {
          setBookmarkDocument(result);
          setBookmarked(true);
        }
      } catch (err: any) {
        Alert.alert(err.message);
      }
    };
    checkIfVideoIsBookmarked();
  }, [loggedInUser?.$id, id]);

  return {
    player,
    videoIsPlaying,
    setVideoIsPlaying,
    menuOpened,
    setMenuOpened,
    bookmarked,
    bookmarkDocument,
    saveGag,
    unbookmarkGag,
    deleteGag,
    isOwner: creatorId === bookmarkDocument?.userId,
  };
}
