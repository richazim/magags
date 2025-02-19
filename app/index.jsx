import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import GlobalContext from "../context/GlobalProvider";
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import Loader from "../components/Loader";
import images from "../constants/images";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomButton from "../components/CustomButton";
import {StatusBar} from "expo-status-bar";


const Welcome = () => {
    const {appwriteLoading, loggedInUser} = useContext(GlobalContext);
    const router = useRouter();

    useEffect(() => {
        if(!appwriteLoading && loggedInUser){ // encapsuler dans useEffect avec dependances qu'il soit executer plusieurs fois lors des multiples rendu de react
            router.replace("/home");
        }
    }, [appwriteLoading, loggedInUser]);

    
 return (
  <SafeAreaView>
      <Loader loading={appwriteLoading}/>
      <View
          className="flex items-center"
          style={{
              marginTop: moderateScale(30),
              marginBottom: moderateScale(30)
          }}
      >
          <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                  width: moderateScale(81),
                  height: moderateScale(41),
              }}
          />
      </View>
      <View className="flex items-center">
          <Image
              source={images.newsletter}
              resizeMode="contain"
              style={{
                  width: moderateScale(304),
                  height: moderateScale(304)
              }}
          />
      </View>
      <Text
          className="text-center font-bold"
          style={{
              marginTop: moderateScale(20),
              fontSize: moderateScale(20)
          }}
      >
          Vous Cherchez des Gags{"\n"} <Text className="text-[#FF8E01] text-[30px]">Relax</Text> est la Réponse
      </Text>
      <Text
          className="text-center"
          style={{
              marginTop: moderateScale(20),
          }}
      >
          Explorez des gags créés par des utilisateurs {"\n"} de partout dans le monde
      </Text>
      <View
          className="flex items-center"
          style={{
              marginTop: moderateScale(50),
          }}
      >
          <View
              className="flex flex-row justify-between"
              style={{
                  width: moderateScale(300)
              }}
          >
              <CustomButton
                  text="Se connecter"
                  containerStyles="w-[138px] h-[55px] bg-[#FF8E01] rounded-[10px]"
                  textStyles="text-white font-bold text-[20px]"
                  callback={() => {router.push("/sign-in")}}
                  loading={appwriteLoading}
              />
              <CustomButton
                  text="S'inscrire"
                  containerStyles="w-[138px] h-[55px] rounded-[10px]"
                  textStyles="text-[#FF8E01] font-bold text-[27px]"
                  callback={() => {router.push("/sign-up")}}
                  loading={appwriteLoading}
              />
          </View>
      </View>
      <StatusBar hidden={false} />
  </SafeAreaView>
 );
};

export default Welcome;