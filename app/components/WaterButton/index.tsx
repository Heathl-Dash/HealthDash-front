import GlassIcon from "@/assets/images/bottles/glass.svg";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

type WidthProp = number | `${number}%`;

interface WaterButtonProp {
  waterGoal: number;
  mlDrinked: number;
  width?: WidthProp;
  onPress: () => void;
}

const WaterButton = ({ waterGoal, mlDrinked, width, onPress }: WaterButtonProp) => {
  const [levelStyle, setLevelStyle] = useState("fistLevel");
  const waterLevel = Math.min((mlDrinked / waterGoal) * 100, 100);

  useEffect(() => {
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
       if (waterLevel < 100) {
        setLevelStyle("fourthLevel");
        return;
      }
      if (waterLevel >= 100) {
        setLevelStyle("successLevel");
        return;
      }
    };
    handleLevelStyle(waterLevel);
    console.log(waterLevel)
  }, [mlDrinked, waterGoal, waterLevel]);

  const dynamicWidthStyle: ViewStyle = width !== undefined ? { width } : {};

  return (
    <View style={[styles.progressBorderContainer, dynamicWidthStyle]}>
      <View
        style={[
          styles.progressBorder,
          {
            width: `${waterLevel}%`,
            backgroundColor: "transparent",
            borderColor: "#78F75F",
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
  },
  container: {
    width: '100%',
    height: '95%',
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
    backgroundColor: "#e4b92b"
  },
  fourthLevel:{
    backgroundColor: "#4FACF7",
  },
  successLevel: {
    backgroundColor: "#4dc236",
  },
});

export default WaterButton;
  