import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from "react-native";

const CustomButton = ({
                        text,
                        containerStyles,
                        textStyles,
                        callback,
                        loading,
                        style
                      }) => {

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