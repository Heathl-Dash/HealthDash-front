import { Colors } from "@/constants/Colors";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { postNutritionInfo } from "../lib/axios";

export default function Nutri() {
  const [alimentValue, setAlimentValue] = useState("");

  const {
    mutate: searchAliment,
    isPending,
    isError,
    data,
  } = useMutation({
    mutationFn: postNutritionInfo,
  });
  

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.alimentSearchContainer}>
        <Text style={styles.alimentSearchTitle}>Pesquisa Nutricional</Text>
        <View style={styles.inputContainer}>
          <CustomInput
            value={alimentValue}
            onChangeText={setAlimentValue}
            placeholder="ex:Tomate"
            styleContainer={{ width: "75%" }}
          />
          <CustomButton
            onPress={() => {
              searchAliment({ aliment: alimentValue });
            }}
            title="Buscar"
            isLoading={isPending}
            variant="primary"
            style={{ width: "25%" }}
            shape="rect"
          />
        </View>
      </View>

      {isError && <Text style={{ color: "red" }}>Algo deu errado :(</Text>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alimentSearchContainer: {
    marginTop: 20,
  },
  alimentSearchTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.light.darkGray,
  },
  inputContainer: {
    width: "90%",
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
