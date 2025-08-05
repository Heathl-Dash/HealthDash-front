import { TabItem } from "@/components/Tabs";
import {
  addFitNegativeCounter,
  addFitPositiveCounter,
  addNutriNegativeCounter,
  addNutriPositiveCounter,
  createFitHabit,
  createNutriHabit,
  deleteFitHabit,
  deleteNutriHabit,
  editFitHabit,
  editNutriHabit,
  getFitHabits,
  getNutriHabits,
  habitForm,
} from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useHabit = () => {
  const [currentTab, setCurrentTab] = useState("habit");

  const TABS: TabItem[] = [
    { key: "habit", label: "Hábitos" },
    { key: "todo", label: "Tarefas" },
  ];
  
  const {
    data: nutriHabits,
    error: habitNutriError,
    isLoading: habitNutriIsLoading,
    refetch
  } = useQuery({ queryKey: ["nutriHabit"], queryFn: getNutriHabits });

  const queryClient = useQueryClient();

  const createNutriHabitMutation = () => {
    return useMutation({
      mutationFn: (habitData: habitForm) => {
        if (!habitData.positive && !habitData.negative) {
          alert("Hábito deve ser positivo ou negativo.");
          throw new Error("Hábito deve ser positivo ou negativo.");
        }

        return createNutriHabit(habitData);
      },
      onSuccess: () => {
        console.log("Hábito criado com sucesso!");
        refetch()
      },
      onError: (error: any) => {
        console.error("Erro ao criar hábito:", error.message ?? error);
      },
    });
  };

  const deleteNutriHabitMutation = () => {
    return useMutation({
      mutationFn: (id:number) => deleteNutriHabit(id),
      onSuccess: () => {
        console.log("Hábito deletado com sucesso!");
        refetch()
      },
      onError: (error:any) => {
        console.error("Erro ao deletar hábito:", error.message ?? error);
      }
    })
  };

  type editHabitPayload = {
    id: number,
    habitData: habitForm
  };

  const editNutriHabitMutation = () => {
    return useMutation({
      mutationFn: ({id, habitData}: editHabitPayload) => {
        if (!habitData.positive && !habitData.negative) {
          throw new Error("Hábito deve ser positivo ou negativo.");
        }

        return editNutriHabit(habitData, id);
      }, 
      onSuccess: () => {
        refetch()
      },
      onError: (error:any) => {
        console.error("Erro ao deletar hábito:", error.message ?? error);
      }
    })
  }

  const createFitHabitMutation = () => {
    return useMutation({
      mutationFn: (habitData: habitForm) => {
        if (!habitData.positive && !habitData.negative) {
          alert("Hábito deve ser positivo ou negativo.");
          throw new Error("Hábito deve ser positivo ou negativo.");
        }

        return createFitHabit(habitData);
      },
      onSuccess: () => {
        refetchFit()
      },
      onError: (error: any) => {
        console.error("Erro ao criar hábito:", error.message ?? error);
      },
    });
  };

  const deleteFitHabitMutation = () => {
    return useMutation({
      mutationFn: (id:number) => deleteFitHabit(id),
      onSuccess: () => {
        console.log("Hábito deletado com sucesso!");
        refetchFit()
      },
      onError: (error:any) => {
        console.error("Erro ao deletar hábito:", error.message ?? error);
      }
    })
  };

  const editFitHabitMutation = () => {
    return useMutation({
      mutationFn: ({id, habitData}: editHabitPayload) => {
        if (!habitData.positive && !habitData.negative) {
          throw new Error("Hábito deve ser positivo ou negativo.");
        }

        return editFitHabit(habitData, id);
      }, 
      onSuccess: () => {
        refetchFit()
      },
      onError: (error:any) => {
        console.error("Erro ao deletar hábito:", error.message ?? error);
      }
    })
  }

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
    refetch:refetchFit
  } = useQuery({ queryKey: ["fitHabit"], queryFn: getFitHabits });

  const addFitPositiveCounterMutation = useMutation({
    mutationFn: (id: number) => addFitPositiveCounter(id),
    onSuccess: () => {
      refetchFit()
    },
  });

  const addFitNegativeCounterMutation = useMutation({
    mutationFn: (id: number) => addFitNegativeCounter(id),
    onSuccess: () => {
      refetchFit()
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
    createNutriHabitMutation,
    editNutriHabitMutation,
    deleteNutriHabitMutation,
    deleteFitHabitMutation,
    editFitHabitMutation,
    createFitHabitMutation,
    fitHabits,
    habitFitError,
    habitFitIsLoading,
    addFitPositiveCounterMutation,
    addFitNegativeCounterMutation,
    allHabits,
  };
};

export default useHabit;
