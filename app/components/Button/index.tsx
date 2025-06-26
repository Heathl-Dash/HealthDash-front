import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { DisabledButton, Variants, VariantText } from "./variants";

type ButtonVariants = keyof typeof Variants;

interface ButtonProps {
  title: string;
  variant: ButtonVariants;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  isDisable?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  onPress: () => void;
}

const Button = ({
  title,
  variant,
  onPress,
  isDisable,
  isLoading,
  icon,
  iconPosition = "start",
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
        pressed && styles.buttonPressed,
        isLoading && styles.buttonLoading
      ]}
      onPress={onPress}
      disabled={isDisable}
    >
      {isLoading && (
        <ActivityIndicator
          color={StyleSheet.flatten(styleText)?.color || VariantText[variant].color}
        />
      )}
      {icon && iconPosition === "start" && icon}
      <Text style={[VariantText[variant], styleText, isDisable && DisabledButton.text]}>
        {title}
      </Text>
      {icon && iconPosition === "end" && icon}
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
  buttonLoading:{
    opacity: 0.7,
  }
});
