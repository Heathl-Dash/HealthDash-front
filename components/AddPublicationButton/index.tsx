import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface AddPublicationButtonProps{
  onPress: () => void;
}

const AddPublicationButton = ({onPress}:AddPublicationButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesome6 name="plus" size={21} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 65,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: Colors.light.secondary,
    bottom: 10,
    right: 10
  },
});

export default AddPublicationButton;
