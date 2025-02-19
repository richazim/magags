import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import GlobalContext from "../../context/GlobalProvider";
import {getLoggedInUser, login} from "../../lib/appwrite";
import {Link, useRouter} from "expo-router";
import {moderateScale} from "react-native-size-matters";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import images from "../../constants/images";

const SignIn = () => {
    const {setLoggedInUser} = useContext(GlobalContext);
    const [formSubmittedToAppwriteAPI, setFormSubmittedToAppwriteAPI] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const submit = async () => {
        if(formData.email !== "" && formData.password !== ""){
            setFormSubmittedToAppwriteAPI(true);
            try{
                await login(formData.email, formData.password);
                const loggedInUser = await getLoggedInUser();
                setLoggedInUser(loggedInUser);
                router.replace("/home");
            }catch(err){
                Alert.alert("Appwrite", err.message);
                console.log(err);
            }finally {
                setFormSubmittedToAppwriteAPI(false);
            }
        }else{
            Alert.alert("Please fill in all fields.");
        }
    }

 return (
  <SafeAreaView className="flex h-screen w-screen justify-center items-center">
      <ScrollView className="w-screen">
        <View
            className="flex justify-center items-center"
            style={{
                height: moderateScale(43),
                marginTop: moderateScale(55),
                marginBottom: moderateScale(31)
            }}
        >
            <Text
                className="text-[#FF8E01] font-bold"
                style={{
                    fontSize: moderateScale(30)
                }}
            >
                Se connecter ici
            </Text>
        </View>

          <View
            className=""
            style={{
                marginBottom: moderateScale(40)
            }}
          >
            <Text
                className="text-center font-bold"
                style={{
                    fontSize: moderateScale(19)
                }}
            >
                Bienvenue! Content de vous revoir! {"\n"} Vous nous avez manqué
            </Text>
          </View>

          <View
            className="flex items-center"
          >
            <FormField
                value={formData.email}
                valueStyle="text-[20px] text-[#FF8E01]"
                placeholderText="exemple@gmail.com"
                placeholderColor="#fcb099"
                borderColor="#FF8E01"
                backgroundColor="#fee2d9"
                callback={(email) => {setFormData({...formData, email: email})}}
            />
              <FormField
                value={formData.password}
                valueStyle="text-[20px] text-[#FF8E01]"
                placeholderText="password"
                placeholderColor="#fcb099"
                borderColor="#FF8E01"
                backgroundColor="#fee2d9"
                callback={password => {
                    setFormData({...formData, password: password})
                }}
                title="password"
                verticalMargin={moderateScale(14)}
              />
          </View>

          <Text
            className="text-right text-[#F74712]"
            style={{
                paddingRight: moderateScale(32)
            }}
          >
              Mot de passe oublié?
          </Text>

          <View
            className="flex items-center"
            style={{
                marginTop: moderateScale(34)
            }}
          >
              <CustomButton
                  text="Se connecter"
                  containerStyles="h-[55px] bg-[#FF8E01] rounded-[10px]"
                  textStyles="text-white font-bold text-[20px]"
                  callback={submit}
                  loading={formSubmittedToAppwriteAPI}
                  style={{
                      width: moderateScale(323),
                  }}
              />
          </View>

          <View
            className="flex items-center"
          >
             <Text
                 className="font-bold"
                 style={{
                     marginVertical: moderateScale(32)
                 }}
             >
                 Pas encore un compte? <Link href="/sign-up"><Text className="text-[#FF8E01]">S’inscrire ici</Text></Link>
             </Text>
          </View>

          <View
            className="flex items-center"
          >
            <Text
                className=""
            >
                ou continuer avec
            </Text>
              <Image
                source={images.googleLogo}
                style={{
                    width: moderateScale(65),
                    height: moderateScale(24),
                    marginTop: moderateScale(15)
                }}
                resizeMode="contain"
              />
          </View>
      </ScrollView>
  </SafeAreaView>
 );
};

export default SignIn;