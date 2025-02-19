import React, {useContext, useEffect} from 'react';
import {Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import GlobalContext from "../../context/GlobalProvider";
import {Stack, useRouter} from "expo-router";
import Loader from "../../components/Loader";
import app from "../index";

const AuthLayout = () => {
    const {appwriteLoading, loggedInUser} = useContext(GlobalContext);
    const router = useRouter();

    useEffect(() => {
        if(!appwriteLoading && loggedInUser){
            router.replace("/home")
        }
    }, [appwriteLoading, loggedInUser]);

 return (
      <>
          <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="sign-in"/>
              <Stack.Screen name="sign-up"/>
          </Stack>
          <Loader loading={appwriteLoading}/>
          <StatusBar hidden={true}/>
      </>
 );
};

export default AuthLayout;