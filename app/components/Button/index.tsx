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
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  onPress: () => void;
}

const Button = ({
  title,
  variant,
  onPress,
  isDisable,
  icon,
  iconPosition,
  style,
  styleText,
}: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        Variants[variant],
        style,
        isDisable && DisabledButton.container,
        iconPosition === "end" && { flexDirection: "row-reverse" },
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      disabled={isDisable}
    >
      {icon && icon}
      <Text
        style={[VariantText[variant], styleText, isDisable && DisabledButton.text]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
