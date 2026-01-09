import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import CustomButton from "../CustomButton";

interface ImageInputProps {
  onChangeImages: (images: string[]) => void;
}
const ImageInput = ({ onChangeImages }: ImageInputProps) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access the media library is required.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });

    console.log(result);

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      onChangeImages(uris);
    }
  };

  return (
    <>
      <CustomButton
        title="Adicionar imagem"
        onPress={pickImage}
        variant="tertiary"
        shape="rect"
        icon={<Entypo name="attachment" size={20} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageInput;
