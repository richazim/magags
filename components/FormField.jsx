import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {moderateScale} from "react-native-size-matters";
import icons from "../constants/icons";

const FormField = ({
                        value,
                        valueStyle,
                        placeholderText,
                        placeholderColor,
                        borderColor,
                        backgroundColor,
                        callback,
                        title,
                        verticalMargin
                   }) => {
    const [showPassword, setShowPassword] = useState(false);

 return (
  <View
    className="border rounded-[12px] flex flex-row"
    style={{
        height: moderateScale(50),
        width: moderateScale(323),
        marginVertical: verticalMargin,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
    }}
  >
      <TextInput
        value={value}
        placeholder={placeholderText}
        className={`p-2 flex-1 ${valueStyle}`}
        style={{
            paddingLeft: moderateScale(12),
        }}
        placeholderTextColor={placeholderColor}
        onChangeText={callback}
        autoCapitalize="none"
        secureTextEntry={title === "password" ? !showPassword : false}
      />

      {title === "password" && (
        <TouchableOpacity
            className="h-full w-[50px] flex justify-center items-center"
            onPress={() => setShowPassword(!showPassword)}
        >
            <Image
                source={showPassword ? icons.eyeHide : icons.eye}
                style={{
                    width: moderateScale(20),
                    height: moderateScale(20)
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
      )}
  </View>
 );
};

export default FormField;