import { GagFormData } from "@/types/forms";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Alert } from "react-native";

export const useDocumentPicker = (formData: GagFormData, setFormData: React.Dispatch<React.SetStateAction<GagFormData>>) => {
  const processSelection = async (fileType: "image" | "video") => {
    try {
      let result: DocumentPicker.DocumentPickerResult;

      if (fileType === "image") {
        result = await DocumentPicker.getDocumentAsync({
          type: ["image/jpeg", "image/png"],
        });
      } else if (fileType === "video") {
        result = await DocumentPicker.getDocumentAsync({
          type: ["video/mp4", "video/mpeg", "video/quicktime"],
        });
      } else {
        Alert.alert("Unsupported file type");
        return;
      }

      if (!result.canceled) {
        const selectedFile: DocumentPicker.DocumentPickerAsset = result.assets[0];
        const newFormData = {
          ...formData,
          [fileType === "image" ? "thumbnail" : "video"]: selectedFile,
        };
        setFormData(newFormData);
      } else {
        console.log("Sélection annulée");
      }
    } catch (err) {
      console.error(err);
      console.log("Échec de la sélection du fichier");
    }
  };

  return { processSelection };
};
