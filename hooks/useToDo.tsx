import {
  fitToggleMarkTodoDone,
  getFitToDo,
  getNutriToDo,
  nutriToggleMarkTodoDone,
} from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTodo = () => {
  const {
    data: nutriToDo = [],
    error: toDoNutriError,
    isLoading: isNutriToDoLoading,
  } = useQuery<IToDo[]>({ queryKey: ["nutriToDo"], queryFn: getNutriToDo });

  const {
    data: fitToDo = [],
    error: toDoFitError,
    isLoading: isFitToDoLoading,
  } = useQuery<IToDo[]>({ queryKey: ["fitToDo"], queryFn: getFitToDo });

  const queryClient = useQueryClient();

  const toggleMarkToDoNutri = useMutation({
    mutationFn: (id: number) => nutriToggleMarkTodoDone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutriToDo"] });
    },
  });

  const toggleMarkToDoFit = useMutation({
    mutationFn: (id: number) => fitToggleMarkTodoDone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fitToDo"] });
    },
  });

  const normalizedNutriTodos = nutriToDo.map((todo) => ({
    ...todo,
    source: "nutri" as const,
  }));

  const normalizedFitTodos = fitToDo.map((todo) => ({
    ...todo,
    source: "fit" as const,
  }));

  const allTodos = [...normalizedNutriTodos, ...normalizedFitTodos].sort((a, b) => {
    const dateA = new Date(a.created ?? 0).getTime();
    const dateB = new Date(b.created ?? 0).getTime();
    return dateB - dateA;
  });

  return {
    nutriToDo,
    toDoNutriError,
    isNutriToDoLoading,
    toggleMarkToDoNutri,
    fitToDo,
    isFitToDoLoading,
    toDoFitError,
    toggleMarkToDoFit,
    allTodos,
  };
};

export default useTodo;
