import Bottle from "@/assets/images/bottles/bottle.svg";
import Glass from "@/assets/images/bottles/glass.svg";
import PlasticBottle from "@/assets/images/bottles/platicBottle.svg";
import SportBottle from "@/assets/images/bottles/sportBottle.svg";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Variant, VariantIcon } from "./variant";

interface BottleButtonProps {
  name: string;
  mlCapacity: number;
  bottleStyle?: number;
  variant?: keyof typeof Variant;
  isSelected?: boolean;
  onPress: () => void;
}

const BOTTLES = [
  { id: 1, image: Glass },
  { id: 2, image: PlasticBottle },
  { id: 3, image: SportBottle },
  { id: 4, image: Bottle },
];

const BottleButton = ({
  name,
  mlCapacity,
  bottleStyle,
  onPress,
  variant,
  isSelected,
}: BottleButtonProps) => {
  const BottleIcon = BOTTLES.find((bottle) => bottleStyle === bottle.id)?.image;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bottleButtonContainer,
        variant && Variant[variant],
        pressed && styles.buttonPressed,
        isSelected && styles.selected,
      ]}
    >
      <Text style={styles.bottleTitle}>{name}</Text>
      <View style={[variant ? VariantIcon[variant] : { height: 65 }]}>
        {BottleIcon ? (
          <BottleIcon
            height={[variant ? VariantIcon[variant].height : 65]}
            stpreserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <Glass
            height={[variant ? VariantIcon[variant].height : 65]}
            preserveAspectRatio="xMidYMid meet"
          />
        )}
      </View>
      {mlCapacity >= 1000 ? (
        <Text style={styles.bottleMl}>{mlCapacity / 1000}L</Text>
      ) : (
        <Text style={styles.bottleMl}>{mlCapacity}ML</Text>
      )}
    </Pressable>
  );
};

export default BottleButton;

const styles = StyleSheet.create({
  bottleButtonContainer: {
    alignSelf: "flex-start",
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  bottleTitle: {
    color: "white",
    fontWeight: "700",
  },
  bottleMl: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  selected: {
    borderWidth: 3,
    borderColor: "#fffde7",
  },
});
