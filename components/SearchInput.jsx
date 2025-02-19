import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {moderateScale} from "react-native-size-matters";
import icons from "../constants/icons";
import {useRouter} from "expo-router";

const SearchInput = ({
    initialText
                     }) => {
    const [inputedText, setInputedText] = useState(initialText || "");
    const router = useRouter();

    const search = () => {
        if(inputedText == null || inputedText.trim().length === 0){
            return;
        }
        const textToSearch = inputedText.trim();
        router.push(`/gags/${textToSearch}`);
    }

 return (
  <View
      style={{
          marginBottom: moderateScale(28),
          marginTop: moderateScale(10)
      }}
  >
      <View
          style={{
              width: moderateScale(327),
              height: moderateScale(58),
              borderRadius: moderateScale(8)
          }}
          className="border mx-auto bg-[#1E1E2D] flex flex-row justify-center"
      >
          <TextInput
              placeholder="Search here..."
              placeholderTextColor="#6F6FF5"
              defaultValue={inputedText}
              className={`p-2 flex-1 text-[20px] text-[#6F6FF5]`}
              style={{
                  paddingLeft: moderateScale(12),
              }}
              onChangeText={(text) => {setInputedText(text)}}
              autoCapitalize="none"
          />
          <TouchableOpacity
              className="h-full w-[50px] flex justify-center items-center"
              onPress={() => {
                  search()
              }}
          >
              <Image
                  source={icons.search}
                  style={{
                      width: moderateScale(20),
                      height: moderateScale(20)
                  }}
                  resizeMode="contain"
              />
          </TouchableOpacity>
      </View>
  </View>
 );
};

export default SearchInput;