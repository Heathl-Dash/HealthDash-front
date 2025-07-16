import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

const Header = () => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>HealthDash</Text>
    </View>
  );
};

export default Header

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingBottom: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: "100%",
    height: 60,
    justifyContent: "flex-end",
  },
  title: {
    color: Colors.light.darkGray,
    fontWeight: "800",
    fontSize: 20,
  },
});