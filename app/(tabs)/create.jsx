import React, {useContext, useState} from 'react';
import {Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import GlobalContext from "../../context/GlobalProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import {moderateScale} from "react-native-size-matters";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import icons from "../../constants/icons";
import * as DocumentPicker from 'expo-document-picker';
import {createVideoPlayer, useVideoPlayer, VideoView} from "expo-video";
import {createGagDocument} from "../../lib/appwrite";

const Create = () => {
    const {loggedInUser} = useContext(GlobalContext);
    const [startUploading, setStartUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        thumbnail: null,
        video: null,
        description: ""
    })

    const processSelection = async (fileType) => {
        try{
            let result;
            switch (fileType){
                case "image":
                    result = await DocumentPicker.getDocumentAsync({type: ["image/jpeg", "image/png"]});
                    break;
                case "video":
                    result = await  DocumentPicker.getDocumentAsync({type: ["video/mp4", "video/mpeg", "video/quicktime"]});
                    break;
                default:
                    Alert.alert("Unsuported file type");
                    break;
            }
            if(!result.canceled){
                if(fileType === "image"){
                    setFormData({...formData, thumbnail: result.assets[0]});
                }
                if(fileType === "video"){
                    setFormData({...formData, video: result.assets[0]});
                }
            }else{
                Alert.alert("Selection canceled");
            }
        }catch(err){
            Alert.alert("Echec de selection du fichier");
            console.log(err);
        }
    }

    const getPlayer = (source) => {
        return createVideoPlayer(source);
    }

    const submit = async () => {
        if(formData.title === "" || formData.video === null){
            Alert.alert("Veuillez remplir les champs obligatoires");
            return;
        }
        setStartUploading(true);
        let createdGagDocument;
        try{
            createdGagDocument = await createGagDocument(formData.title, formData.thumbnail, formData.video, formData.description, loggedInUser.$id)
        }catch(err){
            console.log(err);
        }finally {
            setStartUploading(false)
            setFormData({
                title: "",
                thumbnail: null,
                video: null,
                description: ""
            })
        }
        if(createdGagDocument){
            Alert.alert("Gag televersé avec succès!");
        }else{
            Alert.alert("Echec de creation du gag.")
        }
    }

 return (
  <SafeAreaView>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <ScrollView>
              <View
                  className="mx-auto"
              >
                  <Text
                      className="text-[22px] font-semibold text-[#FF8E01]"
                      style={{
                          marginTop: moderateScale(20),
                          marginBottom: moderateScale(17)
                      }}
                  >
                      Téléverser un gag
                  </Text>

                  <FormField
                      value={formData.title}
                      valueStyle="text-[18px] text-[#6F6FF5]"
                      placeholderText="Titre...*"
                      placeholderColor="#6F6FF5"
                      borderColor="#232533"
                      backgroundColor="#1E1E2D"
                      callback={(new_title) => {setFormData({...formData, title: new_title})}}
                      verticalMargin={22}
                  />

                  <View
                      style={{
                          marginBottom: moderateScale(22),
                      }}
                  >
                      <Text className="text-[16px] font-medium text-[#FF8E01] mb-2">
                          Importer une vidéo (mp4, mov)*
                      </Text>
                      <TouchableOpacity
                          style={{
                              height: moderateScale(149)
                          }}
                          className="bg-[#1E1E2D] rounded-[8px] flex flex-row justify-center items-center"
                          onPress={() => processSelection("video")}
                      >
                          {formData.video ? (
                              <VideoView
                                  player={getPlayer(formData.video.uri)}
                                  contentFit="contain"
                                  style={{
                                      width: moderateScale(140),
                                      height: "100%"
                                  }}
                                  pointerEvents="none"
                              />
                          ):(
                              <Image
                                  source={icons.upload}
                                  style={{
                                      height: moderateScale(50),
                                      width: moderateScale(50),
                                  }}
                                  resizeMode="contain"
                              />
                          )}
                      </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                      style={{
                          marginBottom: moderateScale(22),
                      }}
                      className="bg-[#1E1E2D] rounded-[8px]"
                      onPress={() => processSelection("image")}
                  >
                      {formData.thumbnail ? (
                          <Image
                              source={{
                                  uri: formData.thumbnail.uri
                              }}
                              style={{
                                  height: moderateScale(100),
                                  marginVertical: moderateScale(5)
                              }}
                              resizeMode="contain"
                          />
                      ):(
                          <View
                              className="flex flex-row justify-center items-center"
                              style={{
                                  height: moderateScale(50),
                              }}
                          >
                              <Image
                                  source={icons.upload}
                                  style={{
                                      height: moderateScale(50),
                                      width: moderateScale(50),
                                  }}
                                  resizeMode="contain"
                              />
                              <Text
                                  className="text-[#6F6FF5]"
                              >
                                  Photo de couverture...
                              </Text>
                          </View>
                      )}
                  </TouchableOpacity>

                  <FormField
                      value={formData.description}
                      valueStyle="text-[18px] text-[#6F6FF5]"
                      placeholderText="Description..."
                      placeholderColor="#6F6FF5"
                      borderColor="#232533"
                      backgroundColor="#1E1E2D"
                      callback={(newDescription) => {setFormData({...formData, description: newDescription})}}
                  />

                  <CustomButton
                      text="Publier"
                      containerStyles="h-[55px] bg-[#FF8E01] rounded-[10px]"
                      textStyles="text-white font-bold text-[20px]"
                      callback={submit}
                      loading={startUploading}
                      style={{
                          width: moderateScale(323),
                          marginVertical: moderateScale(20)
                      }}
                  />
              </View>
          </ScrollView>
      </KeyboardAvoidingView>
  </SafeAreaView>
 );
};

export default Create;