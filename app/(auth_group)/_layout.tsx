import MyActivityIndicator from '@/components/shared/MyActivityIndicator';
import AuthContext from '@/context/AuthContext';
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated';
import { Stack } from "expo-router";
import React, { useContext } from 'react';

const AuthLayout = () => {
     const {appwriteLoading} = useContext(AuthContext);
     useRedirectIfAuthenticated();

 return (
      <>
          <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="sign-in"/>
              <Stack.Screen name="sign-up"/>
          </Stack>
          <MyActivityIndicator loading={appwriteLoading} />
      </>
 );
};

export default AuthLayout;