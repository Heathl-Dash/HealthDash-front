import {
  createFitToDo,
  createNutriToDo,
  deleteFitToDo,
  deleteNutriToDo,
  editFitToDo,
  editNutriToDo,
  fitToggleMarkTodoDone,
  getFitToDo,
  getNutriToDo,
  nutriToggleMarkTodoDone,
  toDoForm,
} from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTodo = () => {
  const {
    data: nutriToDo = [],
    error: toDoNutriError,
    isLoading: isNutriToDoLoading,
    refetch: refetchNutri
  } = useQuery<IToDo[]>({ queryKey: ["nutriToDo"], queryFn: getNutriToDo });

  const {
    data: fitToDo = [],
    error: toDoFitError,
    isLoading: isFitToDoLoading,
    refetch: refetchFit
  } = useQuery<IToDo[]>({ queryKey: ["fitToDo"], queryFn: getFitToDo });

  const queryClient = useQueryClient();

  type EditToDoPayload = {
    id: number;
    toDoData: toDoForm;
  };

  const createNutriToDoMutation = () => {
    return useMutation({
      mutationFn: (toDoData: toDoForm) => {
        return createNutriToDo(toDoData);
      },
      onSuccess: () => {
        console.log("Tarefa criada com sucesso!");
        refetchNutri()
      },
      onError: (error: any) => {
        console.error("Erro ao criar tarefa:", error.message ?? error);
      },
    });
  };

  const editNutriToDoMutation = () => {
    return useMutation({
      mutationFn: ({ id, toDoData }: EditToDoPayload) => {
        return editNutriToDo(toDoData, id);
      },
      onSuccess: () => {
        refetchNutri()
      },
      onError: (error: any) => {
        console.error("Erro ao editar tarefa:", error.message ?? error);
      },
    });
  };

  const deleteNutriToDoMutation = () => {
    return useMutation({
      mutationFn: (id: number) => deleteNutriToDo(id),
      onSuccess: () => {
        refetchNutri()
      },
      onError: (error: any) => {
        console.error("Erro ao deletar tarefa:", error.message ?? error);
      },
    });
  };

  const createFitToDoMutation = () => {
    return useMutation({
      mutationFn: (toDoData: toDoForm) => {
        return createFitToDo(toDoData);
      },
      onSuccess: () => {
        console.log("Tarefa criada com sucesso!");
        refetchFit()
      },
      onError: (error: any) => {
        console.error("Erro ao criar tarefa:", error.message ?? error);
      },
    });
  };

  const editFitToDoMutation = () => {
    return useMutation({
      mutationFn: ({ id, toDoData }: EditToDoPayload) => {
        return editFitToDo(toDoData, id);
      },
      onSuccess: () => {
        refetchFit()
      },
      onError: (error: any) => {
        console.error("Erro ao editar tarefa:", error.message ?? error);
      },
    });
  };

  const deleteFitToDoMutation = () => {
    return useMutation({
      mutationFn: (id: number) => deleteFitToDo(id),
      onSuccess: () => {
        refetchFit()
      },
      onError: (error: any) => {
        console.error("Erro ao deletar tarefa:", error.message ?? error);
      },
    });
  };

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
    createNutriToDoMutation,
    deleteNutriToDoMutation,
    editNutriToDoMutation,
    createFitToDoMutation,
    editFitToDoMutation,
    deleteFitToDoMutation,
    isFitToDoLoading,
    toDoFitError,
    toggleMarkToDoFit,
    allTodos,
  };
};

export default useTodo;
