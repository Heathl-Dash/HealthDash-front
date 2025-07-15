import { Colors } from "@/constants/Colors";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import ResultNutritionSearch from "../../components/ResultNutritionSearch";
import { postNutritionInfo } from "../../lib/axios";
import Header from "../../components/Header";

export default function Nutri() {
  const [alimentValue, setAlimentValue] = useState("");
  const [searchedAliment, setSearchedAliment] = useState("");

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const {
    mutate: searchAliment,
    isPending,
    isError,
    data,
  } = useMutation({
    mutationFn: postNutritionInfo,
    onSuccess: (_, variables) => {
      setSearchedAliment(variables.aliment); // Atualiza somente quando a busca é bem-sucedida
      openSheet();
    },
  });

  const handleSearch = () => {
    const trimmedValue = alimentValue.trim();

    if (!trimmedValue) {
      console.warn("Valor inválido para pesquisa.");
      return;
    }

    searchAliment({ aliment: trimmedValue });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Header/>
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
            onPress={handleSearch}
            title="Buscar"
            isLoading={isPending}
            variant="primary"
            style={{ width: "25%" }}
            shape="rect"
          />
        </View>
      </View>
      {isError && <Text style={{ color: "red" }}>Algo deu errado :(</Text>}
      <ResultNutritionSearch
        aliment={searchedAliment}
        nutritionResult={data}
        ref={bottomSheetRef}
        isLoading={isPending}
      />
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
