import React, {useContext, useEffect} from 'react';
import {FlatList, Image, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import VideoCard from "../../components/VideoCard";
import {moderateScale} from "react-native-size-matters";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import TrendingItemsList from "../../components/TrendingItemsList";
import EmptyState from "../../components/EmptyState";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useAppwrite} from "../../hooks/useAppwrite";
import {getUserBookmarkedGags} from "../../lib/appwrite";
import GlobalContext from "../../context/GlobalProvider";

const Bookmark = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const {loggedInUser} = useContext(GlobalContext);
    const {data, reExecute} = useAppwrite(() => getUserBookmarkedGags(loggedInUser.$id))

    useEffect(() => {

    }, [data]);

 return (
  <SafeAreaView
      className="h-screen"
  >
      <FlatList
          data={data}
          renderItem={({item}) => {
              return (
                  <VideoCard
                      id={item.$id}
                      title={item.title}
                      thumbnailUrl={item.thumbnailUrl}
                      videoUrl={item.videoUrl}
                      creatorUsername={item.creatorId.username}
                      creatorAvatarUrl={item.creatorId.avatarUrl}
                      thumbnailStorageId={item.thumbnailStorageId}
                      videoStorageId={item.videoStorageId}
                      homeScreenRefresher={reExecute}
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
                          style={{
                              marginTop: moderateScale(20),
                              paddingHorizontal: moderateScale(20)
                          }}
                      >
                          <Text className="text-[24px] font-bold text-[#FF8E01] text-center">
                              Gags Enregistrés
                          </Text>
                      </View>
                  </>
              )
          }}
          ListEmptyComponent={() => {
              return (
                  <View
                      style={{
                          marginTop: moderateScale(50),
                      }}
                  >
                      <EmptyState
                          primaryTitle="Vous n'avez pas encore de gags favoris"
                          secondaryTitle="Vos Gags enregistrés apparaitrons ici!"
                      />
                  </View>
              )
          }}
          ListFooterComponent={() => <View></View>}
          ListFooterComponentStyle={{
              marginBottom: tabBarHeight
          }}
          // refreshing={homeScreenIsRefreshing}
          // onRefresh={refreshFetchedData}
          showsVerticalScrollIndicator={false}
      />
  </SafeAreaView>
 );
};

export default Bookmark;