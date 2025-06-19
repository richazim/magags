import SearchInput from "@/components/Input/SearchInput";
import EmptyState from "@/components/States/EmptyState";
import VideoCard from "@/components/Videos/VideoCard";
import LogoSmallImage from "@/constants/images/logoSmallImge";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const SearchGagByTitleScreen = () => {
    const {title} = useLocalSearchParams();
    const { data, refetch } = useSearchResults(title);

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
                                    source={LogoSmallImage}
                                    style={{
                                        height: moderateScale(35),
                                        width: moderateScale(31),
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
   
                            <SearchInput initialText={typeof title === "string" ? title : title[0]}/>
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

export default SearchGagByTitleScreen;