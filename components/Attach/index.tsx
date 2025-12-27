import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AttachProps {
  type: "toDo" | "habit";
  attach: IAttach | null;
}

const Attach = ({ type, attach }: AttachProps) => {
  const toDoBackGround = attach?.done ? "#f0f0f0" : "#e0e0e0";
  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <Text style={styles.title}>{attach?.title}</Text>
        {attach?.description && <Text style={styles.description}>{attach.description}</Text>}
        <View style={styles.counterContainer}></View>
      </View>
      {type === "habit" && (
        <View style={styles.counterContainer}>
          {attach?.isNegative && (
            <View style={[styles.counterContent, { backgroundColor: "#67B8F9" }]}>
              <Text style={styles.counterText}>-{attach.negativeCount?.toString()}</Text>
            </View>
          )}
          {attach?.isPositive && (
            <View style={[styles.counterContent, { backgroundColor: "#4FACF7" }]}>
              <Text style={styles.counterText}>+{attach.positiveCount?.toString()}</Text>
            </View>
          )}
        </View>
      )}
      {type === "toDo" && (
        <View style={styles.counterContainer}>
          <View style={[styles.counterContent, { backgroundColor: toDoBackGround }]}>
            {attach?.done ? (
              <MaterialIcons color={Colors.light.darkGray} size={30} name="check" />
            ) : (
              <MaterialIcons color={Colors.light.darkGray} size={40} name="radio-button-unchecked" />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Attach;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    padding: 20,
    paddingTop: 25,
    borderRadius: 25,
    backgroundColor: Colors.light.primary,
  },
  textContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "700",
  },
  description: {
    paddingTop: 10,
    color: "white",
    opacity: 9,
    textAlign: "center",
  },
  typeIdentifier: {
    color: "white",
    opacity: 8.5,
  },
  counterContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end",
  },
  counterContent: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    color: "white",
  },
});
