import Habit from "@/components/Habit";
import Tabs, { TabItem } from "@/components/Tabs";
import { Colors } from "@/constants/Colors";
import useSearchAliment from "@/hooks/useSearchAliment";
import { addNutriNegativeCounter, addNutriPositiveCounter, getNutriHabits } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import ResultNutritionSearch from "../../components/ResultNutritionSearch";

export default function Nutri() {
  const [currentTab, setCurrentTab] = useState("habit");

  const TABS: TabItem[] = [
    { key: "habit", label: "Hábitos" },
    { key: "todo", label: "tarefas" },
  ];

  const {
    alimentValue,
    setAlimentValue,
    searchedAliment,
    bottomSheetRef,
    data,
    handleSearch,
    isError,
    isPending,
  } = useSearchAliment();

  const {
    data: nutriHabits,
    error: habitError,
    isLoading: habitIsLoading,
  } = useQuery({ queryKey: ["nutriHabit"], queryFn: getNutriHabits });

  const queryClient = useQueryClient();

  const addPositiveCounterMutation = useMutation({
    mutationFn: (id: number) => addNutriPositiveCounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutriHabit"] });
    },
  });

  const addNegativeCounterMutation = useMutation({
    mutationFn: (id: number) => addNutriNegativeCounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutriHabit"] });
    },
  });

  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
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

        <View style={{ marginTop: 35, marginBottom: 25 }}>
          <Tabs
            tabs={TABS}
            initialTabKey="habit"
            onTabChange={(key: string) => setCurrentTab(key)}
          />
        </View>

        {habitIsLoading && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={50} />
          </View>
        )}

        {currentTab === "habit" ? (
          <FlatList
            data={nutriHabits || []}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.habitTodoContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Habit
                habit={item}
                onPressPositive={() => {
                  addPositiveCounterMutation.mutate(item.id);
                }}
                onPressEdit={() => {}}
                onPressNegative={() => {
                  addNegativeCounterMutation.mutate(item.id);
                }}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: Colors.light.darkGray, textAlign:"center" }}>Nenhum hábito encontrado.</Text>
            }
          />
        ) : (
          <View style={styles.habitTodoContainer}>
            <Text style={{ color: "black" }}>Tarefas</Text>
          </View>
        )}

        {habitError && (
          <View style={styles.errorContent}>
            <Text style={{ color: Colors.light.redColor }}>
              Não foi possível carregar os hábitos
            </Text>
          </View>
        )}
      </SafeAreaView>
      <ResultNutritionSearch
        aliment={searchedAliment}
        nutritionResult={data}
        ref={bottomSheetRef}
        isLoading={isPending}
      />
    </>
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
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  habitTodoContainer: {
    gap: 10,
    width: "100%",
    paddingBottom: 150,
  },
  errorContent: {
    alignItems: "center",
  },
});
