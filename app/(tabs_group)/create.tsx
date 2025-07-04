import CustomButton from "@/components/Buttons/CustomButton";
import FormField from "@/components/Form/FormField";
import UploadIcon from "@/constants/icons/uploadIcon";
import AuthContext from "@/context/AuthContext";
import { useCreateGagForm } from "@/hooks/useCreateGagForm";
import { getPlayer } from "@/utils/videoPlayer";
import { VideoView } from "expo-video";
import { useContext } from "react";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const CreateScreen = () => {
    const {loggedInUser} = useContext(AuthContext);

    const { 
        formData, 
        setFormData, 
        startUploading, 
        processSelection, 
        submit 
      } = useCreateGagForm(loggedInUser?.$id);

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
                                  source={UploadIcon}
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
                                  source={UploadIcon}
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

export default CreateScreen;