import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const Variants = StyleSheet.create({
  primary: {
    backgroundColor: Colors.light.primary,
  },
  secondary:{
    backgroundColor: Colors.light.secondary
  },
  outLine: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    backgroundColor: "transparent",
  },
  ghost: {
    backgroundColor: "transparent",
  },
});

export const VariantText = StyleSheet.create({
  primary: {
    color: "white",
    fontWeight: "800",
  },
  secondary: {
    color: "white",
    fontWeight: "800",
  },
  outLine: {
    color: Colors.light.primary,
    fontWeight: "800",
  },
  ghost: {
    color: Colors.light.darkGray,
    fontWeight: "800"
  },
});

export const DisabledButton = StyleSheet.create({
  container: {
    opacity: 0.5,
  },
  text: {
    opacity: 1,
  },
});

export const Shapes = StyleSheet.create({
  rounded: {
    borderRadius: 50,
  },
  rect: {
    borderRadius: 8,
  },
});
