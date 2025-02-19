import React from 'react';
import {Text, View} from "react-native";
import {moderateScale} from "react-native-size-matters";

const Info = ({
    number,
    unit
              }) => {
 return (
  <View
  >
      <Text
          className="text-center font-bold"
          style={{
              fontSize: moderateScale(20)
          }}
      >
          {number}
      </Text>
      <Text
          className="text-center"
          style={{
              fontSize: moderateScale(14)
          }}
      >
          {unit}
      </Text>
  </View>
 );
};

export default Info;