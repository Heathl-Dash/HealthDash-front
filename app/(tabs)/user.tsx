import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import CustomInput from "@/components/CustomInput";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FlatList } from "react-native-gesture-handler";

export default function User() {

  const inputFields = [
    { label: "Altura" },
    { label: "Peso" },
    { label: "Altura" },
  ]

  return (
    <SafeAreaView>
      <Header/>
      <View style={styles.inputsContainer}>
        <CustomInput
        label="Nome"
        style={{height:42}}
        />
        <FlatList
          data={inputFields}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.inputItem}>
              <CustomInput label={item.label} style={{ width: 146, height: 42 }} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    width: "88%",
    marginLeft: 24,
    height: "88%",
  },
  inputItem: {
    marginRight: 68,
    marginBottom: 22,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },
  flatListContent: {
    marginTop: 24,
  },
});