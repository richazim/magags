import { AuthProvider } from "@/context/AuthContext";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { useSplashScreen } from "@/hooks/useSplashScreen";
import { SplashScreen, Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import React from "react";
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
          >
            <Stack.Screen name="index" />
        </Stack>
      </PaperProvider>
    </AuthProvider>
  );
};

export default RootLayout;
