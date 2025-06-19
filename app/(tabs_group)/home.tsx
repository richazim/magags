import HomeHeader from "@/components/Home/HomeHeader";
import MyActivityIndicator from "@/components/shared/MyActivityIndicator";
import EmptyState from "@/components/States/EmptyState";
import VideoCard from "@/components/Videos/VideoCard";
import AuthContext from "@/context/AuthContext";
import { useHomeData } from "@/hooks/useHomeData";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { FlatList, SafeAreaView, View } from "react-native";

const HomeScreen = () => {
    const {loggedInUser, appwriteLoading} = useContext(AuthContext)
    const tabBarHeight = useBottomTabBarHeight();
    
    const {
        availableVideos,
        trendingVideos,
        isRefreshing,
        refresh,
        isLoading
      } = useHomeData();

    if(isLoading || isRefreshing){
        return <MyActivityIndicator loading={isLoading || isRefreshing}/>
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
                            creatorUsername={item.creatorId.username!}
                            creatorAvatarUrl={item.creatorId.avatarUrl}
                            thumbnailStorageId={item.thumbnailStorageId}
                            videoStorageId={item.videoStorageId}
                            homeScreenRefresher={refresh}
                        />
                    )
                }}
                keyExtractor={(item) => {
                    return item.$id
                }}
                ListHeaderComponent={() => (
                    loggedInUser && (
                        <HomeHeader 
                        username={loggedInUser?.username} 
                        trendingVideos={trendingVideos} 
                        />
                    )
                  )}
                ListEmptyComponent={() => (
                    (loggedInUser || !appwriteLoading) && (
                        <EmptyState
                          primaryTitle="Aucun gag trouvé"
                          secondaryTitle="Créez un gag, svp!"
                        />
                    )
                )}
                ListFooterComponent={() => <View></View>}
                ListFooterComponentStyle={{
                    marginBottom: tabBarHeight
                }}
                refreshing={isRefreshing}
                onRefresh={refresh}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
       );
};

export default HomeScreen;