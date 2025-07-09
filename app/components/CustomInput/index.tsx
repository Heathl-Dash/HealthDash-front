import { Colors } from "@/constants/Colors";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  style?: StyleProp<TextStyle>;
  styleContainer?: StyleProp<ViewStyle>
}

const CustomInput = ({
  label,
  errorMessage,
  style,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  styleContainer,
  ...rest
}: CustomInputProps) => {
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const borderColor = flattenedStyle.borderColor;
  return (
    <View style={[styles.container, styleContainer]}>
      {label && <Text style={[styles.label, { color: borderColor }]}>{label}:</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, style, errorMessage && styles.inputError]}
        // style={[styles.input, style, errorMessage && styles.inputError]}
        {...rest}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width:'100%',
  },
  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.light.darkGray,
    borderRadius: 8,
  },
  inputError: {
    borderColor: Colors.light.redColor,
  },
  label: {
    color: Colors.light.darkGray,
    textTransform: "capitalize",
    fontWeight: 500,
  },
  error:{
    color: '#ff0000'
  },
});
