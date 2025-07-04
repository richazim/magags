import * as DocumentPicker from "expo-document-picker";

export type FormFieldProps = {
    value: string;
    valueStyle: string;
    placeholderText: string;
    placeholderColor: string;
    borderColor: string;
    backgroundColor: string;
    callback: (text: string) => void;
    title?: string;
    verticalMargin?: number;
}

export interface GagFormData{
  title: string;
  thumbnail: DocumentPicker.DocumentPickerAsset | null;
  video: DocumentPicker.DocumentPickerAsset | null;
  description: string
}