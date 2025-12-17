import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  feedSocialMedia?: boolean;
}

const Header = ({ feedSocialMedia }: HeaderProps) => {
  return (
    <View style={[styles.container, { justifyContent: "space-between" }]}>
      <Text style={styles.title}>HealthDash</Text>
      {feedSocialMedia && (
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu" size={28} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    color: Colors.light.darkGray,
    fontWeight: "800",
    fontSize: 20,
  },
});
