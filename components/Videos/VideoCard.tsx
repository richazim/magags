import MenuIcon from "@/constants/icons/menuIcon";
import PlayIcon from "@/constants/icons/playIcon";
import { useVideoCardController } from "@/hooks/useVideoCardController";
import { VideoView } from "expo-video";
import React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";

type VideoCardProps = {
    id: string;
    title: string;
    thumbnailUrl: string;
    thumbnailStorageId: string;
    videoUrl: string;
    videoStorageId: string;
    creatorId: string;
    creatorUsername: string;
    creatorAvatarUrl: string;
    homeScreenRefresher: () => Promise<void>;
}

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
                   }: VideoCardProps) => {

    const {
        player,
        videoIsPlaying,
        setVideoIsPlaying,
        menuOpened,
        setMenuOpened,
        bookmarked,
        saveGag,
        unbookmarkGag,
        deleteGag,
        isOwner,
        } = useVideoCardController({
        videoUrl,
        videoStorageId,
        thumbnailUrl,
        thumbnailStorageId,
        id,
        creatorId,
        refresher: homeScreenRefresher,
        });
                      

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
                                  source={MenuIcon}
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
                      {isOwner && (
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
                                  className="absolute bg-black h-full w-full"
                                  height={100}
                                  width={100}
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
                                  source={PlayIcon}
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