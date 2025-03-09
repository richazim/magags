import React, {useEffect} from 'react';
import "../global.css";
import {GlobalProvider} from "../context/GlobalProvider";
import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import { Provider as PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync().catch(() => {});

const RootLayout = () => {
    let [loaded, error] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf')
    });

    useEffect(() => {
        if(loaded || error){
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if(!loaded && !error){
        return null;
    }

 return (
  <GlobalProvider>
      <PaperProvider>
          <Stack
              screenOptions={{
                  headerShown: false
              }}
          >
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
              {/*<Stack.Screen name="gags/[query]" />*/}
          </Stack>
      </PaperProvider>
  </GlobalProvider>
 );
};

export default RootLayout;