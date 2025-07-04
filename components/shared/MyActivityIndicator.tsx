import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MyActivityIndicatorProps = { loading: boolean };

const MyActivityIndicator = ({ loading }: MyActivityIndicatorProps) => {
  if (!loading) {
    return null;
  }

  return (
    <SafeAreaView className="absolute h-screen w-screen flex justify-center items-center">
      <ActivityIndicator size="large" color="#FF8E01" animating={loading} />
    </SafeAreaView>
  );
};

export default MyActivityIndicator;
