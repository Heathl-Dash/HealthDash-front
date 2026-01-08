import CustomInput from "@/components/CustomInput";
import ImageInput from "@/components/ImageInput";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePublication = () => {
  const show = true;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ title: "Publicar" }} />

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
              <View style={styles.extraDiv} />
            )}
            
            <View style={styles.optionsContainer}>
              <ImageInput />
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
  extraDiv: {
    width: "100%",
    height: 100,
    backgroundColor: Colors.light.accent3,
    marginBottom: 15,
    borderRadius: 10,
  },
  optionsContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: Platform.OS === 'android' ? 60 : 0,
  },
});

export default CreatePublication;