import { createGagDocument } from "@/libs/appwrite/database/gag/createGagDocument";
import { GagFormData } from "@/types/forms";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useDocumentPicker } from "./useDocumentPicker";


export const useCreateGagForm = (userId: string | null | undefined) => {
  const router = useRouter();
  
  const [startUploading, setStartUploading] = useState(false);
  const [formData, setFormData] = useState<GagFormData>({
    title: "",
    thumbnail: null,
    video: null,
    description: "",
  });

  const { processSelection } = useDocumentPicker(formData, setFormData);

  if (!userId) {
    throw new Error("userId is required to use this hook.");
  }

  const resetForm = () => {
    setFormData({
      title: "",
      thumbnail: null,
      video: null,
      description: "",
    });
  };

  const submit = async () => {
    if (formData.title === "" || formData.video === null) {
      Alert.alert("Veuillez remplir les champs obligatoires");
      return;
    }

    setStartUploading(true);

    try {
      const gag = await createGagDocument(
        formData.title,
        formData.thumbnail,
        formData.video,
        formData.description,
        userId
      );

      if (gag) {
        Alert.alert("Gag téléversé avec succès !");
        resetForm();
        router.reload();
      } else {
        Alert.alert("Échec de création du gag.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur lors du téléversement");
    } finally {
      setStartUploading(false);
    }
  };

  return {
    formData,
    setFormData,
    startUploading,
    processSelection,
    resetForm,
    submit,
  };
};
