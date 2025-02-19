import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import GlobalContext from "../../context/GlobalProvider";
import {getLoggedInUser, login, registerAndSaveDocumentAndLogin} from "../../lib/appwrite";
import {Link, useRouter} from "expo-router";
import {moderateScale} from "react-native-size-matters";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import images from "../../constants/images";

const SignUp = () => {
    const {setLoggedInUser} = useContext(GlobalContext);
    const [formSubmittedToAppwriteAPI, setFormSubmittedToAppwriteAPI] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const router = useRouter();

    const submit = async () => {
        if(formData.username !== "" && formData.email !== "" && formData.password !== ""){
            setFormSubmittedToAppwriteAPI(true);
            try{
                await registerAndSaveDocumentAndLogin(formData.username, formData.email, formData.password);
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
                        Créer un compte
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
                        Créer un compte pour pouvoir {"\n"} explorez tous nos gags
                    </Text>
                </View>

                <View
                    className="flex items-center"
                >
                    <FormField
                        value={formData.username}
                        valueStyle="text-[20px] text-[#FF8E01]"
                        placeholderText="Nom d'utilisateur"
                        placeholderColor="#fcb099"
                        borderColor="#FF8E01"
                        backgroundColor="#fee2d9"
                        callback={(username) => {setFormData({...formData, username: username})}}
                        verticalMargin={moderateScale(14)}
                    />

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

                <View
                    className="flex items-center"
                    style={{
                        marginTop: moderateScale(34)
                    }}
                >
                    <CustomButton
                        text="S’inscrire"
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
                        Vous possédez un compte deja? <Link href="/app/(auth)/sign-in"><Text className="text-[#FF8E01]">se connecter ici</Text></Link>
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

export default SignUp;