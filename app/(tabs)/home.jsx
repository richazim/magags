import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from "react-native";
import {usePathname} from "expo-router";
import {useAppwrite} from "../../hooks/useAppwrite";
import {getAllAvailableVideos, getTrendingVideos} from "../../lib/appwrite";
import {SafeAreaView} from "react-native-safe-area-context";
import VideoCard from "../../components/VideoCard";
import images from "../../constants/images";
import {moderateScale} from "react-native-size-matters";
import SearchInput from "../../components/SearchInput";
import TrendingItemsList from "../../components/TrendingItemsList";
import EmptyState from "../../components/EmptyState";
import GlobalContext from "../../context/GlobalProvider";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import Loader from "../../components/Loader";

const Home = () => {
    const {reExecute: refreshAvailableVideos, appwriteIsLoading, data: availableVideos } = useAppwrite(getAllAvailableVideos);
    const {data: trendingVideos, reExecute: refreshTrendingVideos} = useAppwrite(getTrendingVideos);
    const [homeScreenIsRefreshing, setHomeScreenIsRefreshing] = useState(false)
    const {loggedInUser} = useContext(GlobalContext);
    const tabBarHeight = useBottomTabBarHeight();

    const refreshFetchedData = async function(){
        setHomeScreenIsRefreshing(true);
        await refreshAvailableVideos();
        await refreshTrendingVideos();
        setHomeScreenIsRefreshing(false);
    }

    if(appwriteIsLoading){
        return (
            <Loader loading={appwriteIsLoading}/>
        )
    }

    if(homeScreenIsRefreshing){
        return (
            <Loader loading={homeScreenIsRefreshing}/>
        )
    }

 return (
  <SafeAreaView
      className="h-screen"
  >
      <FlatList
          data={availableVideos}
          renderItem={({item}) => {
              return (
                  <VideoCard
                      id={item.$id}
                      title={item.title}
                      thumbnailUrl={item.thumbnailUrl}
                      videoUrl={item.videoUrl}
                      creatorId={item.creatorId.$id}
                      creatorUsername={item.creatorId.username}
                      creatorAvatarUrl={item.creatorId.avatarUrl}
                      thumbnailStorageId={item.thumbnailStorageId}
                      videoStorageId={item.videoStorageId}
                      homeScreenRefresher={refreshFetchedData}
                  />
              )
          }}
          keyExtractor={(item) => {
              return item.$id
          }}
          ListHeaderComponent={() => {
              return (
                  <>
                      <View
                          className="flex flex-row justify-between items-center"
                          style={{
                              marginTop: moderateScale(20),
                              paddingHorizontal: moderateScale(20)
                          }}
                      >
                          <View
                              className=""
                          >
                              <Text
                                  className="text-[#6F6FF5]"
                                  style={{
                                      fontSize: moderateScale(14),
                                  }}
                              >
                                  Bon Retour
                              </Text>
                              <Text
                                  className="text-[#FFB900] font-bold"
                                  style={{
                                      fontSize: moderateScale(24)
                                  }}
                              >
                                  {loggedInUser.username}
                              </Text>
                          </View>

                          <Image
                              source={images.logoSmall}
                              style={{
                                  height: moderateScale(35),
                                  width: moderateScale(31),
                              }}
                              resizeMode="contain"
                          />
                      </View>

                      <SearchInput/>

                      <TrendingItemsList data={trendingVideos}/>
                  </>
              )
          }}
          ListEmptyComponent={() => {
              return (
                  <EmptyState
                    primaryTitle="Aucun gag trouvé"
                    secondaryTitle="Créez un gag, svp!"
                  />
              )
          }}
          ListFooterComponent={() => <View></View>}
          ListFooterComponentStyle={{
              marginBottom: tabBarHeight
          }}
          refreshing={homeScreenIsRefreshing}
          onRefresh={refreshFetchedData}
          showsVerticalScrollIndicator={false}
      />
  </SafeAreaView>
 );
};

export default Home;