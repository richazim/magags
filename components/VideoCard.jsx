import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import {moderateScale} from "react-native-size-matters";
import icons from "../constants/icons";
import {useVideoPlayer, VideoView} from "expo-video";
import {Menu} from "react-native-paper";
import {
    addBookmark, deleteBookmark,
    deleteFile,
    deleteVideoDocument,
    getBookmarkRow,
    getBookmarksRow,
    getUserBookmarksRows
} from "../lib/appwrite";
import GlobalContext from "../context/GlobalProvider";

const VideoCard = ({
    id,
    title,
    thumbnailUrl,
    thumbnailStorageId,
    videoUrl,
    videoStorageId,
    creatorId,
    creatorUsername,
    creatorAvatarUrl,
    homeScreenRefresher
                   }) => {
    const [videoIsPlaying, setVideoIsPlaying] = useState(false);
    const player = useVideoPlayer(videoUrl);
    const [menuOpened, setMenuOpened] = useState(false)
    const {loggedInUser} = useContext(GlobalContext)
    const [bookmarked, setBookmarked] = useState(false)
    const [bookmarkDocument, setBookmarkDocument] = useState(null)

    const deleteGag = async () => {
        try{
            await deleteFile(videoStorageId);
            if(thumbnailUrl){
                await deleteFile(thumbnailStorageId);
            }
            const deletedDocument = await deleteVideoDocument(id);
            if(deletedDocument){
                await homeScreenRefresher()
            }
        }catch(error){
            Alert.alert(error.message);
        }
    }

    const saveGag = async () => {
        try{
            const addedBookmark = await addBookmark(loggedInUser.$id, id);
            if(addedBookmark){
                setBookmarked(true);
                setBookmarkDocument(addedBookmark);
            }
        }catch(err){
            Alert.alert(err.message);
        }
    }

    useEffect(() => {
        const checkIfVideoIsBookmarked = async () => {
            try{
                const result = await getBookmarksRow(loggedInUser.$id, id);
                if(result){
                    setBookmarkDocument(result);
                    setBookmarked(true);
                }
            }catch(err){
                Alert.alert(err.message);
            }
        }

        checkIfVideoIsBookmarked();
    }, [loggedInUser.$id, id]);

    const unbookmarkGag = async () => {
        try{
            const deletedBookmark = await deleteBookmark(bookmarkDocument.$id);
            if(deletedBookmark){
                setBookmarked(false);
                setBookmarkDocument(null);
            }
        }catch(err){
            Alert.alert(err.message);
        }
    }

 return (
  <View
    className=""
    style={{
        marginVertical: moderateScale(18)
    }}
  >
      <View
        className=""
        style={{
            width: moderateScale(327),
            height: moderateScale(265),
            marginHorizontal: "auto"
        }}
      >
          <View
            className="header flex flex-row justify-between"
          >
                <View
                    className="logo"
                >
                    <Image
                        source={{
                            uri: creatorAvatarUrl
                        }}
                        height={moderateScale(50)}
                        width={moderateScale(50)}
                        resizeMode="contain"
                        className="rounded-[8px] border-[#FF9C01] border-[2px]"
                    />
                </View>


              <View
                  className="info flex-1 justify-between"
                  style={{
                      marginHorizontal: moderateScale(10),
                      height: moderateScale(42)
                  }}
              >
                  <Text
                    style={{
                        fontSize: moderateScale(14)
                    }}
                    className="font-bold text-[#E84B4B]"
                    numberOfLines={1}
                  >
                      {title}
                  </Text>

                  <Text
                    className="text-[#6F6FF5]"
                    numberOfLines={1}
                  >
                      {creatorUsername}
                  </Text>
              </View>


              <View
                  className="menu flex items-center justify-center"
                  style={{
                      width: moderateScale(40)
                  }}
              >
                  <Menu
                      visible={menuOpened}
                      onDismiss={() => setMenuOpened(false)}
                      anchor={
                          <TouchableOpacity
                              onPress={() => setMenuOpened(!menuOpened)}
                          >
                              <Image
                                  source={icons.menu}
                                  style={{
                                      width: moderateScale(21),
                                      height: moderateScale(18)
                                  }}
                                  resizeMode="contain"
                              />
                          </TouchableOpacity>
                      }
                  >
                      <Menu.Item
                          onPress={async () => {
                              if(bookmarked){
                                  await unbookmarkGag();
                              }else{
                                  await saveGag();
                              }
                          }}
                          title={`${bookmarked ? "Retirer des favoris" : "Ajouter au favoris"}`}
                      />
                      {creatorId === bookmarkDocument?.userId && (
                          <Menu.Item
                              onPress={async () => {
                                  await deleteGag();
                              }}
                              title="Supprimer"
                          />
                      )}
                  </Menu>
              </View>
          </View>


          <View
            className="body flex justify-center items-center"
            style={{
                height: moderateScale(200),
                marginVertical: "auto"
          }}
          >
              <VideoView
                  player={player}
                  style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: "black",
                      borderRadius: 10
                  }}
                  contentFit="contain"
                  nativeControls={true}
              />
              {
                  !videoIsPlaying && (
                      <View
                        className="absolute flex items-center justify-center"
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                      >
                          {thumbnailUrl && (
                              <Image
                                  source={{
                                      uri: thumbnailUrl
                                  }}
                                  className="absolute bg-black"
                                  height="100%"
                                  width="100%"
                                  resizeMode="contain"
                              />
                          )}
                          <TouchableOpacity
                              onPress={() => {
                                  player.play()
                                  setVideoIsPlaying(true)
                              }}
                              className="absolute"
                              style={{
                                  width: moderateScale(40),
                                  height: moderateScale(40)
                              }}
                          >
                              <Image
                                  source={icons.play}
                                  className=""
                                  style={{
                                      height: "100%",
                                      width: "100%"
                                  }}
                              />
                          </TouchableOpacity>
                      </View>
                  )
              }
          </View>
      </View>
  </View>
 );
};

export default VideoCard;