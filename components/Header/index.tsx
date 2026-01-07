import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  feedSocialMedia?: boolean;
  accountPage?: boolean 
}

const Header = ({ feedSocialMedia, accountPage }: HeaderProps) => {
  const router = useRouter();

  const accontButtonClick = () => {
    router.push("/account/me")
  }
  return (
    <View style={[styles.container, { justifyContent: "space-between" }]}>
      <Text style={styles.title}>HealthDash</Text>
      {feedSocialMedia && (
        <TouchableOpacity onPress={accontButtonClick}>
          <MaterialCommunityIcons name="account-circle-outline" size={28} />
        </TouchableOpacity>
      )}
      {accountPage && (
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
