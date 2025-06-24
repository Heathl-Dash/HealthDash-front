import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { Variants, VariantText } from "./variants";

type ButtonVariants = keyof typeof Variants;

interface ButtonProps {
  title: string;
  variant: ButtonVariants;
  style?: StyleProp<ViewStyle>;
  onPress: () => any;
}

const Button = ({ title, variant, onPress, style }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        Variants[variant],
        style,
        ,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={VariantText[variant]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
