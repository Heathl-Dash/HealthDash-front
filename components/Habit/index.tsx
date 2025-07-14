import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HabitProps {
  habit: IHabit;
  onPressPositive: () => void;
  onPressNegative: () => void;
  onPressEdit: () => void;
}

const Habit = ({
  habit,
  onPressNegative,
  onPressPositive,
  onPressEdit,
}: HabitProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const handleTextLayout = (e: any) => {
    setIsTruncated(e.nativeEvent.lines.length > 2);
  };

  if (!habit) {
    return null;
  }

  return (
    <View style={styles.container}>
      {habit.positive && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPressPositive}
        >
          <MaterialIcons
            size={30}
            color={Colors.light.primary}
            name="add"
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[
          styles.content,
          habit.negative && !habit.positive && { paddingLeft: 60 },
          !habit.description?.trim() && styles.emptyContent,
        ]}
        onPress={onPressEdit}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{habit?.title}</Text>

        {habit.description?.trim() ? (
          <>
            <Text
              onTextLayout={handleTextLayout}
              numberOfLines={showFullDescription ? undefined : 2}
              ellipsizeMode="tail"
              style={styles.description}
            >
              {habit?.description}
            </Text>
            {isTruncated && (
              <TouchableOpacity
                onPress={() => setShowFullDescription(!showFullDescription)}
              >
                <Text style={styles.seeMore}>
                  {showFullDescription ? "Ver menos" : "Ver mais"}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : null}
      </TouchableOpacity>

      {habit.negative && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPressNegative}
        >
          <MaterialIcons
            size={30}
            color={Colors.light.redColor}
            name="remove"
          />
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
  seeMore: {
    color: Colors.light.primary,
    fontWeight: "500",
    marginTop: 4,
  },
});
