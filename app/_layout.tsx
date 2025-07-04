import { AuthProvider } from "@/context/AuthContext";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { useSplashScreen } from "@/hooks/useSplashScreen";
import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { PaperProvider } from 'react-native-paper';
import "../global.css";

SplashScreen.preventAutoHideAsync().catch(() => {});

const RootLayout = () => {
  let [loaded, error] = useLoadFonts();

  useSplashScreen(loaded, error, SplashScreen);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </PaperProvider>
    </AuthProvider>
  );
};

export default RootLayout;
