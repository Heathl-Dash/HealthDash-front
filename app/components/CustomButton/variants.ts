import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const Variants = StyleSheet.create({
  primary: {
    backgroundColor: Colors.light.primary,
    color: "white",
    borderRadius: 50,
  },
  outLine: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
});

export const VariantText = StyleSheet.create({
  primary: {
    color: "white",
    fontWeight: "800",
  },
  outLine: {
    color: Colors.light.primary,
    fontWeight: "800",
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
