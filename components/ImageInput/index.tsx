import { View, Text, TouchableOpacity, Image, StyleSheet, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from "expo-image-picker";
import CustomButton from '../CustomButton';
import { Entypo } from "@expo/vector-icons"




const ImageInput = () => {
  const [image, setImage] = useState<string | null>(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.

    const status = await ImagePicker.getMediaLibraryPermissionsAsync();

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 3
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <CustomButton title="Adicionar imagem" onPress={pickImage} variant="tertiary" shape="rect" icon={<Entypo name="attachment" size={20}/>} />
    </>
  );
}


const styles = StyleSheet.create({

  image: {
    width: 200,
    height: 200,
  },
});

export default ImageInput