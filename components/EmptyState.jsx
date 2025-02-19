import React from 'react';
import {Image, Text, View} from "react-native";
import images from "../constants/images";
import {moderateScale} from "react-native-size-matters";
import CustomButton from "./CustomButton";
import {usePathname, useRouter} from "expo-router";

const EmptyState = ({
    primaryTitle,
    secondaryTitle
                    }) => {
    const actualScreenPath = usePathname();
    const router = useRouter();

 return (
  <View
    className="flex flex-row justify-center w-screen"
    style={{

    }}
  >
      <View
        className=""
      >
          <Image
            source={images.empty}
            className="seach-logo"
            style={{
                width: moderateScale(270),
                height: moderateScale(216),
            }}
          />

          <View
            className="titles "
          >
            <Text
                className="text-center text-[#E84B4B] text-[14px]"
                style={{
                    fontSize: moderateScale(14)
                }}
            >
                {primaryTitle}
            </Text>
              <Text
                  className="text-center text-[#B22222] font-bold"
                  style={{
                      fontSize: moderateScale(20),
                      marginTop: moderateScale(10)
                  }}
              >
                  {secondaryTitle}
              </Text>
          </View>

          {actualScreenPath !== "/home" && (
              <View
                  className="flex flex-row justify-center items-center"
                  style={{
                      height: moderateScale(100)
                  }}
              >
                  <CustomButton
                      text="Accueil"
                      containerStyles="h-[55px] bg-[#FF8E01] rounded-[10px]"
                      textStyles="text-white font-bold text-[20px]"
                      callback={() => {
                          router.replace("/home")
                      }}
                      style={{
                          width: moderateScale(323),
                      }}
                  />
              </View>
          )}
      </View>
  </View>
 );
};

export default EmptyState;