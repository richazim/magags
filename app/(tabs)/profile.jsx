import React, {useContext} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {getTheNumberOfUserBookmarkedGags, getTheNumberOfUserGags, getUserGags, logout} from "../../lib/appwrite";
import {Link, useRouter, usePathname } from "expo-router";
import GlobalContext from "../../context/GlobalProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import VideoCard from "../../components/VideoCard";
import {moderateScale} from "react-native-size-matters";
import EmptyState from "../../components/EmptyState";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import Info from "../../components/Info";
import icons from "../../constants/icons";
import {useAppwrite} from "../../hooks/useAppwrite";

const Profile = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const { loggedInUser ,setLoggedInUser} = useContext(GlobalContext);
    const {data: numberOfUserBookmarkedGags} = useAppwrite(() => getTheNumberOfUserBookmarkedGags(loggedInUser.$id))
    const {data: userGags, reExecute: refetchUserGags} = useAppwrite(() => getUserGags(loggedInUser.$id))
    const {data: numberOfUserGags} = useAppwrite(() => getTheNumberOfUserGags(loggedInUser.$id))
    const router = useRouter();

    const logoutUser = async () => {
        try{
            await logout();
            setLoggedInUser(null);
            router.replace("/sign-in")
        }catch (err){

        }
    }

 return (
     <SafeAreaView
         className="h-screen"
     >
         <FlatList
             data={userGags}
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
                         homeScreenRefresher={refetchUserGags}
                     />
                 )
             }}
             keyExtractor={(item) => {
                 return item.$id
             }}
             ListHeaderComponent={() => {
                 return (
                     <View
                         style={{
                             paddingHorizontal: moderateScale(24)
                         }}
                         className="flex flex-col justify-between"
                     >
                        <View className="relative h-[30px]">
                            <TouchableOpacity
                                onPress={logoutUser}
                                className="absolute top-[50%] translate-y-[-50%] right-0"
                                style={{
                                    marginTop: moderateScale(8)
                                }}
                            >
                                <Image
                                    source={icons.logout}
                                    style={{
                                        width: moderateScale(24),
                                        height: moderateScale(24)
                                    }}
                                    alt="logout"
                                    resizeMode="contain"
                                    className=""
                                />
                            </TouchableOpacity>
                        </View>

                         <View
                             className="flex items-center"
                         >
                             <View
                                 className="border-[2px] border-[#FF9C01] overflow-hidden"
                                 style={{
                                     borderRadius: moderateScale(8)
                                 }}
                             >
                                 <Image
                                     source={{
                                         uri: loggedInUser.avatarUrl
                                     }}
                                     style={{
                                         width: moderateScale(56),
                                         height: moderateScale(56)
                                     }}
                                     resizeMode="contain"
                                 />
                             </View>

                             <Text
                                 style={{
                                     fontSize: moderateScale(18),
                                     marginTop: moderateScale(12)
                                 }}
                                 className="font-bold text-[#FFB900]"
                             >
                                 {loggedInUser.username}
                             </Text>

                             <View
                                 className="flex flex-row justify-between"
                                 style={{
                                     width: moderateScale(100),
                                     height: moderateScale(44),
                                     marginTop: moderateScale(12)
                                 }}
                             >
                                 <Info number={numberOfUserGags} unit="Gags"/>

                                 <Info number={numberOfUserBookmarkedGags} unit="Favoris"/>
                             </View>
                         </View>
                     </View>
                 )
             }}
             ListEmptyComponent={() => {
                 return (
                     <>
                         <EmptyState
                             primaryTitle="Vous avez 0 gags"
                             secondaryTitle="Veuillez en creer pour les voir ici"
                         />
                     </>
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

export default Profile;