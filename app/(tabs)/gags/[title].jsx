import React, {useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import VideoCard from "../../../components/VideoCard";
import {moderateScale} from "react-native-size-matters";
import icons from "../../../constants/icons";
import Info from "../../../components/Info";
import {SafeAreaView} from "react-native-safe-area-context";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import images from "../../../constants/images";
import SearchInput from "../../../components/SearchInput";
import TrendingItemsList from "../../../components/TrendingItemsList";
import {useGlobalSearchParams, useLocalSearchParams, usePathname} from "expo-router";
import {useAppwrite} from "../../../hooks/useAppwrite";
import {searchVideosByTitle} from "../../../lib/appwrite";
import EmptyState from "../../../components/EmptyState";

const Search = () => {
    const {title} = useLocalSearchParams();

    const {data, reExecute} = useAppwrite(() => searchVideosByTitle(title))

    useEffect(() => {
        reExecute();
    }, [title]);

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
                                     Résultats Pour
                                 </Text>
                                 <Text
                                     className="text-[#E84B4B] font-bold"
                                     style={{
                                         fontSize: moderateScale(24)
                                     }}
                                 >
                                     {title}
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

                         <SearchInput initialText={title}/>
                     </>
                 )
             }}
             ListEmptyComponent={() => {
                 return (
                     <>
                         <EmptyState
                             primaryTitle={`"${title}" introuvable`}
                             secondaryTitle="Chercher par d'autres mots"
                         />
                     </>
                 )
             }}
             // refreshing={homeScreenIsRefreshing}
             // onRefresh={refreshFetchedData}
             showsVerticalScrollIndicator={false}
         />
     </SafeAreaView>
 );
};

export default Search;