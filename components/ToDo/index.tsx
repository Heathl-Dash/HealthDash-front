import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ToDoProps {
  todo: IToDo;
  onPressMarkToggle: () => void;
  onPressEdit: () => void;
}

const ToDo = ({ todo, onPressMarkToggle, onPressEdit }: ToDoProps) => {
  if (!todo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton} onPress={onPressMarkToggle}>
        <Feather
          name={todo.done ? "check-circle" : "circle"}
          size={22}
          color={Colors.light.darkGray}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPressEdit}>
          <Text style={styles.title}>{todo.title}</Text>
        </TouchableOpacity>
        {todo.description?.trim() ? (
          <ReadMore
            numberOfLines={2}
            seeLessText="Ver menos"
            seeMoreText="Ver mais"
            style={styles.description}
            animate={false}
            seeMoreStyle={styles.seeMore}
            seeLessStyle={styles.seeMore}
          >
            {todo?.description}
          </ReadMore>
        ) : null}
      </View>
    </View>
  );
};

export default ToDo;

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
    fontWeight: "700",
  },
});
