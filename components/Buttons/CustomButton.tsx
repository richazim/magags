import React from 'react';
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";

type CustomButtonProps = {
    text: string;
    containerStyles?: string;
    textStyles?: string;
    callback?: () => void;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}

const CustomButton = ({
                        text,
                        containerStyles,
                        textStyles,
                        callback,
                        loading,
                        style
                      }: CustomButtonProps) => {

 return (
  <TouchableOpacity
      disabled={loading}
      onPress={callback}
      activeOpacity={0.7}
      className={containerStyles + " flex items-center justify-center " + `${loading ? "opacity-50" : "opacity-100"}`}
      style={style}
  >
   <Text className={textStyles}>{text}</Text>
      {
          loading && <ActivityIndicator className="absolute" color="#E84B4B" size="small"/>
      }
  </TouchableOpacity>
 );
};

export default CustomButton;