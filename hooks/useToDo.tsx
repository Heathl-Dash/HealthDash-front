import {
  fitToggleMarkTodoDone,
  getFitToDo,
  getNutriToDo,
  nutriToggleMarkTodoDone,
} from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTodo = () => {
  const {
    data: nutriToDo,
    error: toDoNutriError,
    isLoading: NutriToDoIsLoading,
  } = useQuery({ queryKey: ["nutriToDo"], queryFn: getNutriToDo });

  const queryClient = useQueryClient();

  const toggleMarkToDoNutri = useMutation({
    mutationFn: (id: number) => nutriToggleMarkTodoDone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutriToDo"] });
    },
  });

  const {
    data: fitToDo,
    error: toDoFitError,
    isLoading: fitToDoIsLoading,
  } = useQuery({ queryKey: ["fitToDo"], queryFn: getFitToDo });

  const toggleMarkToDoFit = useMutation({
    mutationFn: (id: number) => fitToggleMarkTodoDone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fitToDo"] });
    },
  });

  const normalizedNutriTodos =
    nutriToDo?.map((todo: IToDo) => ({ ...todo, source: "nutri" })) || [];
  const normalizedFitTodos =
    fitToDo?.map((todo: IToDo) => ({ ...todo, source: "fit" })) || [];

  const allTodos = [...normalizedNutriTodos, ...normalizedFitTodos].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  return {
    nutriToDo,
    toDoNutriError,
    NutriToDoIsLoading,
    toggleMarkToDoNutri,
    fitToDo,
    fitToDoIsLoading,
    toDoFitError,
    toggleMarkToDoFit,
    allTodos
  };
};

export default useTodo;
