import { Colors } from "@/constants/Colors";
import { DropDownOption } from "@/types/dropdownOptions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDown from "../dropDown";

interface HeaderProps {
  feedSocialMedia?: boolean;
  accountPage?: boolean;
}

const Header = ({ feedSocialMedia, accountPage }: HeaderProps) => {
  const router = useRouter();

  const accountButtonClick = () => {
    router.push("/account/me");
  };

  const accountOptions: DropDownOption[] = [
    {
      label: "Salvos",
      onPress: () => {
        router.push({ pathname: "/collection/[id]", params: { id: "1" } });
      },
    },
  ];
  return (
    <View style={[styles.container, { justifyContent: "space-between" }]}>
      <Text style={styles.title}>HealthDash</Text>
      {feedSocialMedia && (
        <TouchableOpacity onPress={accountButtonClick}>
          <MaterialCommunityIcons name="account-circle-outline" size={28} />
        </TouchableOpacity>
      )}
      {accountPage && (
        <TouchableOpacity>
          <DropDown
            icon={<MaterialCommunityIcons name="menu" size={28} />}
            options={accountOptions}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 20,
  },
  title: {
    color: Colors.light.darkGray,
    fontWeight: "800",
    fontSize: 20,
  },
});
