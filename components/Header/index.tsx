import { Colors } from "@/constants/Colors";
import { DropDownOption } from "@/types/dropdownOptions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDown from "../dropDown";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { TextInput } from "react-native-gesture-handler";

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
  
  const [searchText, setSearchText] = useState("");
  return (
    <View>
      <View style={[styles.container, { justifyContent: "space-between" }]}>
        <Text style={styles.title}>HealthDash</Text>
        <View style={styles.iconsContainer}> 
          {feedSocialMedia && (
            <TouchableOpacity onPress={accountButtonClick}>
              <MaterialCommunityIcons name="account-circle-outline" size={28} />
            </TouchableOpacity>
          )}
        </View>
        {accountPage && (
          <TouchableOpacity>
            <DropDown
              icon={<MaterialCommunityIcons name="menu" size={28} />}
              options={accountOptions}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {feedSocialMedia && (<View style={styles.searchBar}>
        <TextInput
          style = {styles.input}
          placeholder="Pesquisar usuário"
          placeholderTextColor={Colors.dark.darkBlue}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <View style={styles.iconsContainer}>
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
               <MaterialCommunityIcons name="close" size={20} />
              </TouchableOpacity>
          )}
          <TouchableOpacity>
            <MaterialCommunityIcons name="magnify" size={20}/>
          </TouchableOpacity>
        </View>
      </View>)}
     
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
  },
  title: {
    color: Colors.light.darkGray,
    fontWeight: "800",
    fontSize: 20,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  searchBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1, 
    borderColor: Colors.dark.darkBlue,
    borderRadius: 8,
    padding: 10,
    height: 45,
  },
  input: {
    color: Colors.dark.darkBlue,
    height: 45,
    width: "80%",
  }
});
