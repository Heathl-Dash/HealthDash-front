import React from "react";
import { StyleSheet } from "react-native";
import CustomButton from "../CustomButton";

interface TabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const Tab = ({ label, isActive, onPress }: TabProps) => {
  return (
    <CustomButton
      title={label}
      onPress={onPress}
      variant={isActive ? "secondary" : "ghost"}
      style={{ flex: 1 }}
    />
  );
};

export default Tab;

const styles = StyleSheet.create({});
