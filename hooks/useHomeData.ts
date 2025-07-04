// hooks/useHomeData.ts
import { getAllAvailableVideos } from "@/libs/appwrite/database/gag/getAllAvailableVideos";
import { getTrendingVideos } from "@/libs/appwrite/database/gag/getTrendingVideos";
import { useState } from "react";
import { useAppwriteQuery } from "./useAppwriteQuery";

export function useHomeData() {
  const { refetch: refreshAvailableVideos, isLoading, data: availableVideos } = useAppwriteQuery(getAllAvailableVideos);
  const { data: trendingVideos, refetch: refreshTrendingVideos } = useAppwriteQuery(getTrendingVideos);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const refresh = async () => {
    setIsRefreshing(true);
    await refreshAvailableVideos();
    await refreshTrendingVideos();
    setIsRefreshing(false);
  };

  return {
    availableVideos,
    trendingVideos,
    isRefreshing,
    refresh,
    isLoading
  };
}
