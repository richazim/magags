// components/Profile/ProfileHeader.tsx
import LogoutIcon from "@/constants/icons/logoutIcon";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";
import { moderateScale } from "react-native-size-matters";
import Info from "../Info/Info";

type ProfileHeaderProps = {
  loggedInUser: Models.Document,
  numberOfUserGags: number,
  numberOfUserBookmarkedGags: number,
  onLogout: () => void
}
const ProfileHeader = ({ loggedInUser, numberOfUserGags, numberOfUserBookmarkedGags, onLogout }: ProfileHeaderProps) => {

  return (
    <View
      style={{ paddingHorizontal: moderateScale(24) }}
      className="flex flex-col justify-between"
    >
      <View className="relative h-[30px]">
        <TouchableOpacity
          onPress={onLogout}
          className="absolute top-[50%] translate-y-[-50%] right-0"
          style={{ marginTop: moderateScale(8) }}
        >
          <Image
            source={LogoutIcon}
            style={{ width: moderateScale(24), height: moderateScale(24) }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View className="flex items-center">
        <View
          className="border-[2px] border-[#FF9C01] overflow-hidden"
          style={{ borderRadius: moderateScale(8) }}
        >
          <Image
            source={{ uri: loggedInUser.avatarUrl }}
            style={{ width: moderateScale(56), height: moderateScale(56) }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{ fontSize: moderateScale(18), marginTop: moderateScale(12) }}
          className="font-bold text-[#FFB900]"
        >
          {loggedInUser.username}
        </Text>

        <View
          className="flex flex-row justify-between"
          style={{
            width: moderateScale(100),
            height: moderateScale(44),
            marginTop: moderateScale(12),
          }}
        >
          <Info number={numberOfUserGags} unit="Gags" />
          <Info number={numberOfUserBookmarkedGags} unit="Favoris" />
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
