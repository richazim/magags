// components/Home/HomeHeader.tsx
import LogoSmallImage from "@/constants/images/logoSmallImge";
import { Image, Text, View } from "react-native";
import { Models } from "react-native-appwrite";
import { moderateScale } from "react-native-size-matters";
import SearchInput from "../Input/SearchInput";
import TrendingItemsList from "../Videos/TrendingItemsList";

const HomeHeader = ({ username, trendingVideos }: {username: string, trendingVideos: Models.Document[] | null}) => (
  <>
    <View
      className="flex flex-row justify-between items-center"
      style={{
        marginTop: moderateScale(20),
        paddingHorizontal: moderateScale(20),
      }}
    >
      <View>
        <Text
          className="text-[#6F6FF5]"
          style={{ fontSize: moderateScale(14) }}
        >
          Bon Retour
        </Text>
        <Text
          className="text-[#FFB900] font-bold"
          style={{ fontSize: moderateScale(24) }}
        >
          {username}
        </Text>
      </View>
      <Image
        source={LogoSmallImage}
        style={{
          height: moderateScale(35),
          width: moderateScale(31),
        }}
        resizeMode="contain"
      />
    </View>

    <SearchInput />
    <TrendingItemsList data={trendingVideos} />
  </>
);

export default HomeHeader;
