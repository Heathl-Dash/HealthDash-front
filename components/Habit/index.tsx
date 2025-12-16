import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HabitProps {
  habit: IHabit;
  onPressPositive: () => void;
  onPressNegative: () => void;
  onPressEdit: () => void;
}

const Habit = ({ habit, onPressNegative, onPressPositive, onPressEdit }: HabitProps) => {
  if (!habit) {
    return null;
  }

  return (
    <View style={styles.container}>
      {habit.positive && (
        <TouchableOpacity style={styles.actionButton} onPress={onPressPositive}>
          <MaterialIcons size={30} color={Colors.light.primary} name="add" />
        </TouchableOpacity>
      )}

      <View
        style={[
          styles.content,
          habit.negative && !habit.positive && { paddingLeft: 60 },
          !habit.description?.trim() && styles.emptyContent,
        ]}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onPressEdit} activeOpacity={0.7}>
            <Text style={styles.title}>{habit?.title}</Text>
          </TouchableOpacity>
          {habit.description?.trim() ? (
            <ReadMore
              numberOfLines={2}
              seeLessText="Ver menos"
              seeMoreText="Ver mais"
              style={styles.description}
              animate={false}
              seeMoreStyle={styles.seeMore}
              seeLessStyle={styles.seeMore}
            >
              {habit?.description}
            </ReadMore>
          ) : null}
          <View style={[styles.habitCounterContainer, !habit.negative && { paddingRight: 60 }]}>
            {habit.positive_count !== 0 && (
              <Text style={{ color: Colors.light.primary, fontSize: 12 }}>
                +{habit.positive_count}
              </Text>
            )}
            {habit.negative_count !== 0 && (
              <Text style={{ color: Colors.light.primary, fontSize: 12 }}>
                -{habit.negative_count}
              </Text>
            )}
          </View>
        </View>
      </View>

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
    width: "100%",
    minHeight: 70,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  emptyContent: {
    minHeight: 50,
    justifyContent: "center",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "700",
    color: Colors.light.darkGray,
  },
  description: {
    color: Colors.light.darkGray,
    marginTop: 4,
  },
  seeMoreContainer: {
    marginTop: 4,
    alignSelf: "flex-start",
  },
  seeMore: {
    color: Colors.light.primary,
    fontWeight: "700",
  },
  habitCounterContainer: {
    flexDirection: "row",
    gap: 7,
    width: "100%",
    justifyContent: "flex-end",
  },
});
