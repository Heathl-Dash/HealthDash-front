import { Colors } from "@/constants/Colors";
import useSavedCollectionId from "@/hooks/useSavedCollectionId";
import { searchProfile } from "@/lib/profile";
import { DropDownOption } from "@/types/dropdownOptions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDown from "../dropDown";

interface HeaderProps {
  feedSocialMedia?: boolean;
  accountPage?: boolean;
}

const Header = ({ feedSocialMedia, accountPage }: HeaderProps) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<IsimpleProfile[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { data: savedCollectionId, isLoading: savedCollectionLoading } = useSavedCollectionId();

  const handleSearch = async (text: string) => {
    setSearchText(text);
    if (text.trim().length > 0) {
      try {
        const data = await searchProfile(text);
        setResults(data.content || []);
        setShowResults(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const accountButtonClick = () => {
    router.push("/account/me");
  };

  const accountOptions: DropDownOption[] = [
    {
      label: "Salvos",
      onPress: () => {
        if (savedCollectionLoading) {
          Alert.alert("Aguarde", "Carregando coleções...");
          return;
        }
        if (savedCollectionId == null) {
          Alert.alert(
            "Coleção indisponível",
            "Não foi possível localizar a coleção Salvos."
          );
          return;
        }
        router.push({
          pathname: "/collection/[id]",
          params: { id: String(savedCollectionId) },
        });
      },
    },
  ];

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

      {feedSocialMedia && (
        <View>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Pesquisar usuário"
              placeholderTextColor={Colors.dark.darkBlue}
              value={searchText}
              onChangeText={handleSearch}
              onSubmitEditing={() => handleSearch(searchText)}
              returnKeyType="search"
            />
            <View style={styles.iconsContainer}>
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <MaterialCommunityIcons name="close" size={20} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {showResults && results.length > 0 && (
            <View style={styles.resultsContainer}>
              {results.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={styles.resultItem}
                  onPress={() => {
                    setShowResults(false);
                    setSearchText("");
                    router.push(`/account/${profile.id}`);
                  }}
                >
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={24}
                    color={Colors.dark.darkBlue}
                  />
                  <Text style={styles.resultText}>{profile.socialName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
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
  },
  resultsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    marginLeft: 10,
    fontSize: 16,
  },
});