import Habit from "@/components/Habit";
import Tabs, { TabItem } from "@/components/Tabs";
import { Colors } from "@/constants/Colors";
import { addFitNegativeCounter, addFitPositiveCounter, getFitHabits } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Fit() {
  const [currentTab, setCurrentTab] = useState("habit");

  const TABS: TabItem[] = [
    { key: "habit", label: "Hábitos" },
    { key: "todo", label: "tarefas" },
  ];

  const {
    data: fitHabits,
    error: habitError,
    isLoading: habitIsLoading,
  } = useQuery({ queryKey: ["fitHabit"], queryFn: getFitHabits });

  const queryClient = useQueryClient();

  const addPositiveCounterMutation = useMutation({
    mutationFn: (id: number) => addFitPositiveCounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fitHabit"] });
    },
  });

  const addNegativeCounterMutation = useMutation({
    mutationFn: (id: number) => addFitNegativeCounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fitHabit"] });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <View style={{ marginTop: 35, marginBottom: 25 }}>
        <Tabs tabs={TABS} initialTabKey="habit" onTabChange={(key: string) => setCurrentTab(key)} />
      </View>

      {habitIsLoading && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={50} />
        </View>
      )}

      {currentTab === "habit" ? (
        <FlatList
          data={fitHabits || []}
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
            <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>Nenhum hábito encontrado.</Text>
          }
        />
      ) : (
        <View style={styles.habitTodoContainer}>
          <Text style={{ color: "black" }}>Tarefas</Text>
        </View>
      )}

      {habitError && (
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
    paddingBottom: 150,
  },
  errorContent: {
    alignItems: "center",
  },
});
