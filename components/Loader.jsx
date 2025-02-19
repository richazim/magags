import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Loader = ({
                    loading
                }) => {
    if(!loading){
        return null;
    }
    // loading = true;

 return (
  <SafeAreaView className="absolute h-screen w-screen flex justify-center items-center">
      <ActivityIndicator
          size="large"
          color="#FF8E01"
          animating={loading}
      />
  </SafeAreaView>
 );
};

export default Loader;