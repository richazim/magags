import EmptyProfileState from "@/components/Profile/EmptyProfileState";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import VideoCard from "@/components/Videos/VideoCard";
import { useLogout } from "@/hooks/useLogout";
import { useRedirectIfNotAuthenticated } from "@/hooks/useRedirectIfNotAuthenticated";
import { useUserProfileData } from "@/hooks/useUserProfileData";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlatList, SafeAreaView, View } from "react-native";

const ProfileScreen = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const {
        loggedInUser,
        userGags,
        numberOfUserBookmarkedGags,
        numberOfUserGags,
        refetchUserGags
      } = useUserProfileData();

      const { logoutUser } = useLogout();

      useRedirectIfNotAuthenticated()

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
                            creatorId={item.creatorId.$id}
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
                ListHeaderComponent={() => (
                    loggedInUser && ( // Pour empècher le rerendering de ProfileHeader si l'utilisateur est déconnecté
                        <ProfileHeader
                        loggedInUser={loggedInUser!}
                        numberOfUserGags={numberOfUserGags!}
                        numberOfUserBookmarkedGags={numberOfUserBookmarkedGags!}
                        onLogout={logoutUser}
                        />
                    )
                  )}
                ListEmptyComponent={() => <EmptyProfileState />} 
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

export default ProfileScreen;