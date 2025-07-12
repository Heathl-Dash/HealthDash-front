import Habit from "@/components/Habit";
import Tabs, { TabItem } from "@/components/Tabs";
import { Colors } from "@/constants/Colors";
import useSearchAliment from "@/hooks/useSearchAliment";
import { getNutriHabits } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
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
    error,
    isLoading,
  } = useQuery({ queryKey: ["nutriHabit"], queryFn: getNutriHabits });

  return (
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
      <ResultNutritionSearch
        aliment={searchedAliment}
        nutritionResult={data}
        ref={bottomSheetRef}
        isLoading={isPending}
      />

      <View style={{ marginTop: 35, marginBottom:25 }}>
        <Tabs tabs={TABS} initialTabKey="habit" onTabChange={(key: string) => setCurrentTab(key)} />
      </View>

      {isLoading && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={50} />
        </View>
      )}

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 75 }}>
        {currentTab === "habit" ? (
          <View style={{ gap: 10, width: '100%' }}>
            {nutriHabits?.map((habit: IHabit) => (
              <Habit
                key={habit.habit_id}
                habit={habit}
                onPressPositive={() => {}}
                onPressEdit={() => {}}
                onPressNegative={() => {}}
              />
            ))}
          </View>
        ) : (
          <View>
            <Text style={{ color: "black" }}>Tarefas</Text>
          </View>
        )}
      </ScrollView>
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
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
