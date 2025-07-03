import GlassIcon from "@/assets/images/bottles/glass.svg";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type WidthProp = number | `${number}%`;

interface WaterButtonProp {
  waterGoal: number;
  mlDrinked: number;
  width?: WidthProp;
  onPress: () => void;
}

const WaterButton = ({
  waterGoal,
  mlDrinked,
  width,
  onPress,
}: WaterButtonProp) => {
  const [levelStyle, setLevelStyle] = useState("fistLevel");

  useEffect(() => {
    const waterLevel = (mlDrinked / waterGoal) * 100;

    const handleLevelStyle = (waterLevel: number) => {
      if (waterLevel < 25) {
        setLevelStyle("fistLevel");
        return;
      }
      if (waterLevel < 50) {
        setLevelStyle("secondLevel");
        return;
      }
      if (waterLevel < 75) {
        setLevelStyle("thirdLevel");
        return;
      }
      if (waterLevel >= 100) {
        setLevelStyle("successLevel");
        return;
      }
    };
    handleLevelStyle(waterLevel);
  }, [mlDrinked, waterGoal]);

  const dynamicWidthStyle: ViewStyle = width !== undefined ? { width } : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[levelStyle as keyof typeof styles],
        dynamicWidthStyle,
      ]}
    >
      <GlassIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 4 /3,
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
    backgroundColor: "#4FACF7",
  },
  successLevel: {
    backgroundColor: "#78F75F",
  },
});

export default WaterButton;
