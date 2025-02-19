import React, {useState} from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import * as Animatable from 'react-native-animatable';
import {useVideoPlayer, VideoView} from "expo-video";
import {moderateScale} from "react-native-size-matters";
import icons from "../constants/icons";


const viewZoomIn = {
    from: {
        scale: 0.84,
    },
    to: {
        scale: 1.01,
    }
};

const viewZoomOut = {
    from: {
        scale: 1.01,
    },
    to: {
        scale: 0.84,
    }
};

const TrendingItem = ({
    activeElementKey,
    currentElement
                      }) => {
    const [play, setPlay] = useState(false);
    const player = useVideoPlayer(currentElement.videoUrl);
    // console.log(activeElementKey, currentElement.$id);

 return (
  <Animatable.View
      animation={currentElement.$id === activeElementKey ? viewZoomIn : viewZoomOut}
      duration={500}
      className="relative overflow-hidden rounded-[10px]"
      style={{
          height: moderateScale(236),
          width: moderateScale(148)
      }}
  >
      {play ? (
          <VideoView
              player={player}
              nativeControls={true}
              allowsFullscreen={true}
              style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: "10px",
                  backgroundColor: "black"
              }}
          />
      ): (
          <TouchableOpacity
              className="flex flex-row justify-center items-center relative h-full w-full"
              style={{

              }}
              activeOpacity={0.7}
              onPress={() => {
                  setPlay(true);
                  player.play()
              }}
          >
              {currentElement && (
                  <ImageBackground
                      className="absolute w-full h-full"
                      source={{
                          uri: currentElement.thumbnailUrl
                      }}
                      resizeMode="cover"
                  />
              )}
              <Image
                  source={icons.play}
                  style={{
                      width: moderateScale(40),
                      height: moderateScale(40)
                  }}
              />
          </TouchableOpacity>
      )}
  </Animatable.View>
 );
};

export default TrendingItem;