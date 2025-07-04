import CustomButton from '@/components/Buttons/CustomButton';
import Logo from '@/components/Svg/Logo';
import ReaderImage from '@/constants/images/readerImage';
import ROUTES from '@/constants/routes';
import AuthContext from '@/context/AuthContext';
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from 'react-native-size-matters';


const WelcomeScreen = () => {
    const router = useRouter();

    useRedirectIfAuthenticated();
    
 return (
  <SafeAreaView>
      <View
          className="flex items-center"
          style={{
              marginTop: moderateScale(30),
              marginBottom: moderateScale(30)
          }}
      >
          <Logo
              width={moderateScale(81)}
              height={moderateScale(41)}
          />
      </View>
      <View className="flex items-center">
          <Image
              source={ReaderImage}
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
          Vous Cherchez des Gags{"\n"} <Text className="text-[#FF8E01] text-[30px]">MaGags</Text> est la Réponse
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
                  callback={() => {router.push({pathname: ROUTES.SIGN_IN})}}
                  loading={false}
              />
              <CustomButton
                  text="S'inscrire"
                  containerStyles="w-[138px] h-[55px] rounded-[10px]"
                  textStyles="text-[#FF8E01] font-bold text-[27px]"
                  callback={() => {router.push(ROUTES.SIGN_UP)}}
                  loading={false}
              />
          </View>
      </View>
      <StatusBar hidden={false} />
  </SafeAreaView>
 );
};

export default WelcomeScreen;