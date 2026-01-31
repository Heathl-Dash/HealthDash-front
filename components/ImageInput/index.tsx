import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, StyleProp, StyleSheet, ViewStyle } from "react-native";
import CustomButton from "../CustomButton";

interface ImageInputProps {
  value?: string | string[];
  onChangeImages?: (images: string[]) => void;
  onChangeImage?: (images: string) => void;
  label: string;
  allowsMultipleSelection?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}

const ImageInput = ({
  onChangeImages,
  allowsMultipleSelection,
  onChangeImage,
  label,
  icon,
  style
}: ImageInputProps) => {
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
      allowsMultipleSelection,
      selectionLimit: allowsMultipleSelection ? 3 : 1,
    });

    
    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      if (allowsMultipleSelection) {
        onChangeImages?.(uris);
      } else {
        onChangeImage?.(uris[0]);
      }
    }
  };

  return (
    <>
      <CustomButton
        title={label}
        onPress={pickImage}
        variant="tertiary"
        shape="rect"
        icon={icon}
        style={style}
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
