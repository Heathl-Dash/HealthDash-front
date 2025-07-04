import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const ButtonAddBottle = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons name="add" color="white" size={45} />
    </TouchableOpacity>
  );
};

export default ButtonAddBottle;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    minWidth: 100,
    minHeight: 144,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
