import GlassIcon from "@/assets/images/bottles/glass.svg";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import useWaterButton from "./useWaterButton";

type WidthProp = number | `${number}%`;

interface WaterButtonProp {
  waterGoal: number;
  mlDrinked: number;
  width?: WidthProp;
  onPress: () => void;
}

const WaterButton = ({ waterGoal, mlDrinked, width, onPress }: WaterButtonProp) => {
  const { waterLevel, levelStyle } = useWaterButton({
    mlDrinked,
    waterGoal,
  });

  const dynamicWidthStyle: ViewStyle = width !== undefined ? { width } : {};

  return (
    <View style={[styles.progressBorderContainer, dynamicWidthStyle]}>
      <View
        style={[
          styles.progressBorder,
          {
            width: `${waterLevel}%`,
          },
        ]}
      />
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, styles[levelStyle as keyof typeof styles]]}
        activeOpacity={0.8}
      >
        <GlassIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBorderContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 4 / 3,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  progressBorder: {
    position: "absolute",
    height: "100%",
    borderWidth: 8,
    borderRadius: 20,
    borderColor: "#78F75F",
  },
  container: {
    width: "100%",
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  fistLevel: {
    backgroundColor: Colors.light.redColor,
  },
  secondLevel: {
    backgroundColor: "#FF9F41",
  },
  thirdLevel: {
    backgroundColor: "#ecc02f",
  },
  fourthLevel: {
    backgroundColor: "#4FACF7",
  },
  successLevel: {
    backgroundColor: "#4dc236",
  },
});

export default WaterButton;
