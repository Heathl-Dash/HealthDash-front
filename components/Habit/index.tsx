import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HabitProps {
  habit: IHabit;
  onPressPositive: () => void;
  onPressNegative: () => void;
  onPressEdit: () => void;
}

const Habit = ({ habit, onPressNegative, onPressPositive, onPressEdit }: HabitProps) => {
  return (
    <View style={styles.container}>
      {habit.positive && (
        <TouchableOpacity style={styles.actionButton} onPress={onPressPositive}>
          <MaterialIcons size={30} color={Colors.light.primary} name="add" />
        </TouchableOpacity>
      ) }
      <TouchableOpacity style={[styles.content, habit.negative && !habit.positive && {paddingLeft:75}]} onPress={onPressEdit}>
        <Text style={styles.title}>{habit.title}</Text>
        {habit.description && <Text style={styles.description}>{habit.description}</Text>}
      </TouchableOpacity>
      {habit.negative && (
        <TouchableOpacity style={styles.actionButton} onPress={onPressNegative}>
          <MaterialIcons size={30} color={Colors.light.redColor} name="remove" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Habit;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.light.surface,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: 8,
    paddingHorizontal:10
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    // height: "100%",
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "700",
    color: Colors.light.darkGray,
  },
  description: {
    color: Colors.light.darkGray,
  },
});
