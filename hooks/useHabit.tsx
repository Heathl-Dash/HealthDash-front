import { TabItem } from "@/components/Tabs";
import {
  addFitNegativeCounter,
  addFitPositiveCounter,
  addNutriNegativeCounter,
  addNutriPositiveCounter,
  getFitHabits,
  getNutriHabits,
} from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useHabit = () => {
  const [currentTab, setCurrentTab] = useState("habit");

  const TABS: TabItem[] = [
    { key: "habit", label: "Hábitos" },
    { key: "todo", label: "tarefas" },
  ];

  const {
    data: nutriHabits,
    error: habitNutriError,
    isLoading: habitNutriIsLoading,
  } = useQuery({ queryKey: ["nutriHabit"], queryFn: getNutriHabits });

  const queryClient = useQueryClient();

  const addNutriPositiveCounterMutation = useMutation({
    mutationFn: (id: number) => addNutriPositiveCounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutriHabit"] });
    },
  });

  const addNutriNegativeCounterMutation = useMutation({
    mutationFn: (id: number) => addNutriNegativeCounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutriHabit"] });
    },
  });

  const {
    data: fitHabits,
    error: habitFitError,
    isLoading: habitFitIsLoading,
  } = useQuery({ queryKey: ["fitHabit"], queryFn: getFitHabits });

  const addFitPositiveCounterMutation = useMutation({
    mutationFn: (id: number) => addFitPositiveCounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fitHabit"] });
    },
  });

  const addFitNegativeCounterMutation = useMutation({
    mutationFn: (id: number) => addFitNegativeCounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fitHabit"] });
    },
  });

  const normalizedNutriHabits =
    nutriHabits?.map((habit: IHabit) => ({ ...habit, source: "nutri" })) || [];
  const normalizedFitHabits =
    fitHabits?.map((habit: IHabit) => ({ ...habit, source: "fit" })) || [];

  const allHabits = [...normalizedNutriHabits, ...normalizedFitHabits].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );


  return {
    currentTab,
    setCurrentTab,
    TABS,
    nutriHabits,
    habitNutriError,
    habitNutriIsLoading,
    addNutriPositiveCounterMutation,
    addNutriNegativeCounterMutation,
    fitHabits,
    habitFitError,
    habitFitIsLoading,
    addFitPositiveCounterMutation,
    addFitNegativeCounterMutation,
    allHabits,
  };
};

export default useHabit;
