import Habit from "@/components/Habit";
import ToDo from "@/components/ToDo";
import StepCounter from "@/components/StepCounter";
import Tabs from "@/components/Tabs";
import { Colors } from "@/constants/Colors";
import useHabit from "@/hooks/useHabit";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import useTodo from "@/hooks/useToDo";

export default function Fit() {
  const {
    TABS,
    currentTab,
    setCurrentTab,
    fitHabits,
    habitFitError,
    habitFitIsLoading,
    addFitPositiveCounterMutation,
    addFitNegativeCounterMutation,
  } = useHabit();

  const [steps, setSteps] = useState(3247);
  const [goal] = useState(10000);

  const {
    fitToDo,
    fitToDoIsLoading,
    toDoFitError,
    toggleMarkToDoFit
  } = useTodo()

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30, flexGrow: 1 }}>
      <Header />
      <View style={{justifyContent: "center", alignItems: "center", marginTop: 20}}>
        <StepCounter
          steps={steps}
          goal={goal}
          size={250}
          strokeWidth={15}
        />
      </View>

      <View style={{ marginTop: 35, marginBottom: 25 }}>
        <Tabs tabs={TABS} initialTabKey="habit" onTabChange={(key: string) => setCurrentTab(key)} />
      </View>

      {habitFitIsLoading && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={50} />
        </View>
      )}

      {currentTab === "habit" && (
        <FlatList
          data={fitHabits || []}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.habitTodoContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Habit
              habit={item}
              onPressPositive={() => {
                addFitPositiveCounterMutation.mutate(item.id);
              }}
              onPressEdit={() => {}}
              onPressNegative={() => {
                addFitNegativeCounterMutation.mutate(item.id);
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
              Nenhum hábito encontrado.
            </Text>
          }
        />
      )}{currentTab === "todo" && (
          <FlatList
            data={fitToDo}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.habitTodoContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ToDo
                todo={item}
                onPressEdit={() => {}}
                onPressMarkToggle={() => toggleMarkToDoFit.mutate(item.id)}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
                Nenhuma tarefa encontrado.
              </Text>
            }
          />
        )}
      {habitFitError && (
        <View style={styles.errorContent}>
          <Text style={{ color: Colors.light.redColor }}>Não foi possível carregar os hábitos</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  habitTodoContainer: {
    gap: 10,
    width: "100%",
    paddingBottom: 230,
  },
  errorContent: {
    alignItems: "center",
  },
});
