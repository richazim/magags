import CustomButton from "@/components/Buttons/CustomButton";
import FormField from "@/components/Form/FormField";
import GoogleImage from "@/constants/images/googleImage";
import { useSignInForm } from "@/hooks/useSignInForm";
import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";


const SignInScreen = () => {
    const {
        formData,
        handleChange,
        submit,
        formSubmitted
      } = useSignInForm();

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
                  callback={(email) => {handleChange('email', email)}}
              />
                <FormField
                  value={formData.password}
                  valueStyle="text-[20px] text-[#FF8E01]"
                  placeholderText="password"
                  placeholderColor="#fcb099"
                  borderColor="#FF8E01"
                  backgroundColor="#fee2d9"
                  callback={password => {
                    handleChange('password', password)
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
                    loading={formSubmitted}
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
                  source={GoogleImage}
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

export default SignInScreen;