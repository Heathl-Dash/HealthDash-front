import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { DisabledButton, Variants, VariantText } from "./variants";

type ButtonVariants = keyof typeof Variants;

interface ButtonProps {
  title: string;
  variant: ButtonVariants;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  isDisable?: boolean;
  onPress: () => any;
}

const Button = ({ title, variant, onPress, isDisable, style, styleText }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        Variants[variant],
        style && style,
        isDisable && DisabledButton.container,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      disabled={isDisable}
    >
      <Text style={[VariantText[variant], styleText && styleText, isDisable && DisabledButton.text]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
