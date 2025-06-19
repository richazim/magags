import BookmarkHeader from "@/components/Bookmark/BookmarkHeader";
import EmptyBookmarkState from "@/components/Bookmark/EmptyBookmarkState";
import VideoCard from "@/components/Videos/VideoCard";
import { useBookmarkedVideos } from "@/hooks/useBookmarkedVideos";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlatList, SafeAreaView, View } from 'react-native';

const BookmarkScreen = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const { data, refetch } = useBookmarkedVideos();
    

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
                            creatorId={item.creatorId.$id}
                            creatorUsername={item.creatorId.username}
                            creatorAvatarUrl={item.creatorId.avatarUrl}
                            thumbnailStorageId={item.thumbnailStorageId}
                            videoStorageId={item.videoStorageId}
                            homeScreenRefresher={refetch}
                        />
                    )
                }}
                keyExtractor={(item) => {
                    return item.$id
                }}
                ListHeaderComponent={() => <BookmarkHeader />}
                ListEmptyComponent={() => <EmptyBookmarkState />}
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

export default BookmarkScreen;