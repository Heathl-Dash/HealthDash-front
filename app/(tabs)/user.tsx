import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import CustomButton from "@/components/CustomButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

export default function User() {
  const userInfoText = [{label:"Nome"},{ label: "Altura" }, { label: "Peso" }, { label: "Idade" }];

  const IMCInfoText = [{ label: "Classificação" }, { label: "Grau IMC" }];

  

  return (
    <SafeAreaView>
      <Header />
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
    </SafeAreaView>
  );
}

