import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { Colors } from "@/constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

const UserProfileForm = () => {
  const userInfoInputFields = [{ label: "Altura" }, { label: "Peso" }, { label: "Idade" }];

  const IMCInfoInputFields = [{ label: "Classificação" }, { label: "Grau IMC" }];

  return (
    <SafeAreaView>
      <View style={{ width: "88%", marginLeft: 24, alignItems: "flex-end", marginTop: 32 }}>
        <CustomButton
          title="Editar"
          variant="outLine"
          shape="rect"
          iconPosition="end"
          icon={<FontAwesome6 name="edit" color={Colors.light.primary} size={16} />}
          onPress={() => {}}
        />
      </View>

      <View style={styles.inputsContainer}>
        <CustomInput label="Nome" style={{ height: 42 }} />
        <FlatList
          data={userInfoInputFields}
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

      <View style={styles.imcInfos}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: -20,
            padding: 0.5,
            backgroundColor: Colors.light.reactNativeWhite,
          }}
        >
          IMC
        </Text>
        <View style={styles.imcSituation}>
          <FontAwesome6 name="person-circle-check" size={60} color={Colors.light.darkGray} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>18,5</Text>
        </View>
        <FlatList
          data={IMCInfoInputFields}
          style={{ width: "90%" }}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.inputItem}>
              <CustomInput label={item.label} style={{ width: 127, height: 42 }} />
            </View>
          )}
        />
      </View>

      <View style={styles.actionButtonsContainer}>
        <CustomButton
          title="Cancelar"
          variant="secondary"
          shape="rect"
          iconPosition="end"
          icon={<MaterialIcons name="cancel" color={Colors.light.reactNativeWhite} size={18}/>}
          onPress={() => {}}
        />
        <CustomButton
          title="Salvar"
          variant="primary"
          shape="rect"
          iconPosition="end"
          icon={
            <MaterialIcons name="save" color={Colors.light.reactNativeWhite} size={18} />
          }
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    width: "88%",
    marginLeft: 24,
    marginTop: 8,
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
  imcInfos: {
    alignItems: "center",
    borderWidth: 1,
    width: "88%",
    marginLeft: 24,
    borderRadius: 8,
    marginTop: 26,
  },
  imcSituation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 20,
  },
  actionButtonsContainer: {
    width: "88%",
    marginLeft: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 32,
    gap: 24,
  },
});

export default UserProfileForm;