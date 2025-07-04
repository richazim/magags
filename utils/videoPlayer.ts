// utils/video.ts
import { createVideoPlayer, VideoPlayer, VideoSource } from "expo-video";

export const getPlayer = (source: VideoSource): VideoPlayer => {
  return createVideoPlayer(source);
};
