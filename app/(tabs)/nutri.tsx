import Habit from "@/components/Habit";
import HabitTodoManager from "@/components/HabitTodoManager";
import Tabs from "@/components/Tabs";
import ToDo from "@/components/ToDo";
import { Colors } from "@/constants/Colors";
import useHabit from "@/hooks/useHabit";
import useSearchAliment from "@/hooks/useSearchAliment";
import useTodo from "@/hooks/useToDo";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Header from "../../components/Header";
import ResultNutritionSearch from "../../components/ResultNutritionSearch";

export default function Nutri() {
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
    TABS,
    currentTab,
    setCurrentTab,
    nutriHabits,
    habitNutriError,
    habitNutriIsLoading,
    addNutriPositiveCounterMutation,
    addNutriNegativeCounterMutation,
  } = useHabit();

  const { nutriToDo, toDoNutriError, isNutriToDoLoading, toggleMarkToDoNutri } = useTodo();

  const [editItem, setEditItem] = useState<IHabit | IToDo | null>(null);
  const [showHabitManager, setShowHabitManager] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <Header />
      <View style={{ flex: 1 }}>
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
        {habitNutriIsLoading && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={50} />
          </View>
        )}
        <CustomButton
          title="+"
          shape="rect"
          variant="primary"
          onPress={() => setShowHabitManager(true)}
          style={{
            width:64,
            height: 42,
            alignSelf: "flex-end",
            marginBottom: 16
          }}
        />
        <HabitTodoManager
          mode={editItem ? "edit" : "create"}
          type={currentTab === "habit" ? "habit" : "todo"}
          visible={showHabitManager}
          item={editItem ?? undefined}
          backFont="nutri"
          onClose={() => (setShowHabitManager(false), setEditItem(null)) }
        />
        {currentTab === "habit" && (
          <FlatList
            data={nutriHabits || []}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.habitTodoContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Habit
                habit={item}
                onPressPositive={() => {
                  addNutriPositiveCounterMutation.mutate(item.id);
                }}
                onPressEdit={() => {
                  setEditItem(item),
                  setShowHabitManager(true)
                }}
                onPressNegative={() => {
                  addNutriNegativeCounterMutation.mutate(item.id);
                }}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
                Nenhum tarefa encontrado.
              </Text>
            }
          />
        )}
        {currentTab === "todo" && (
          <FlatList
            data={nutriToDo}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.habitTodoContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ToDo
                todo={item}
                onPressEdit={() => {
                  setEditItem(item),
                  setShowHabitManager(true)
                }}
                onPressMarkToggle={() => toggleMarkToDoNutri.mutate(item.id)}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
                Nenhuma tarefa encontrada.
              </Text>
            }
          />
        )}
        {habitNutriError && (
          <View style={styles.errorContent}>
            <Text style={{ color: Colors.light.redColor }}>
              Não foi possível carregar os hábitos
            </Text>
          </View>
        )}
      </View>
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
