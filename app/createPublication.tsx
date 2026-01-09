import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import ImageInput from "@/components/ImageInput";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePublication = () => {
  const [images, setImages] = useState<string[]>([]);
  const show = images.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          title: "Publicar",
          headerRight: () => (
            <CustomButton
              variant="primary"
              title="Publicar"
              onPress={() => {}}
              style={{ backgroundColor: Colors.light.mediumBlue }}
            />
          ),
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 30}
      >
        <View style={styles.mainContainer}>
          <View style={{ flex: 1 }}>
            <CustomInput
              multiline
              autoFocus
              placeholder="O que você está pensando?"
              styleContainer={{ flex: 1 }}
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.bottomContent}>
            {show && (
              <View style={styles.imagesContainer}>
                {images &&
                  images.map((img) => (
                    <Image source={{ uri: img }} key={img} style={styles.image} />
                  ))}
              </View>
            )}

            <View style={styles.optionsContainer}>
              <ImageInput onChangeImages={setImages} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
    textAlignVertical: "top",
    color: Colors.light.darkGray,
    fontSize: 18,
    borderWidth: 0,
    marginBottom: 10,
  },
  bottomContent: {
    marginTop: "auto",
  },
  imagesContainer: {
    flexDirection: "row",
    width: "100%",
    height: 110,
    alignItems: "center",
    gap: 15,
    padding: 10,
    backgroundColor: Colors.light.tertiary,
    marginBottom: 15,
    borderRadius: 10,
  },
  image: {
    borderRadius: 8,
    height: "90%",
    aspectRatio: 1,
  },
  optionsContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: Platform.OS === "android" ? 60 : 0,
  },
});

export default CreatePublication;
