import { HabitForm } from "@/dto/habit.dto";
import { ToDoForm } from "@/dto/todo.dto";
import { fitApi } from "@/service/apis";

export const getFitHabits = () => {
  return fitApi
    .get("fit/habit/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar hábitos de exercício: ", err);
      throw err;
    });
};

export const addFitPositiveCounter = (id: number) => {
  return fitApi
    .patch(`fit/habit/${id}/add_positive_counter/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador positivo de habito de exercício: ", err);
      throw err;
    });
};

export const addFitNegativeCounter = (id: number) => {
  return fitApi
    .patch(`fit/habit/${id}/add_negative_counter/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador negativo de habito de exercício: ", err);
      throw err;
    });
};



export const getFitToDo = () => {
  return fitApi
    .get<IToDo[]>("fit/todo/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar tarefas de exercícios: ", err);
      throw err;
    });
};

export const fitToggleMarkTodoDone = (id: number) => {
  return fitApi
    .patch(`fit/todo/${id}/done_toggle/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao trocar o valor do marcador de feito em tarefas de exercícios: ", err);
      throw err;
    });
};

export const createFitHabit = (habitData: HabitForm) => {
  return fitApi
  .post(`fit/habit/`, habitData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao criar hábito de exercício: ", err)
    throw err;
  })
};

export const editFitHabit = (habitData: HabitForm, id:number) => {
  return fitApi
  .patch(`fit/habit/${id}/`, habitData)
  .then(res=> res.data)
  .catch(err => {
    console.error("Erro ao alterar hábito de exercício: ", err)
    throw err;
  })
};

export const deleteFitHabit = (id:number) => {
  return fitApi
  .delete(`fit/habit/${id}/`)
  .then(res=>res.data)
  .catch(err=>{
    console.error("Erro ao deletar hábito de exercício: ", err)
    throw err;
  })
}

export const createFitToDo = (toDoData:ToDoForm) => {
  return fitApi
  .post(`fit/todo/`, toDoData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao criar tarefa de exercício: ", err)
    throw err;
  })
};

export const editFitToDo = (toDoData:ToDoForm, id:number) => {
  return fitApi
  .patch(`fit/todo/${id}/`, toDoData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao editar tarefa de exercício: ", err)
    throw err;
  })
};

export const deleteFitToDo = (id:number) => {
  return fitApi
  .delete(`fit/todo/${id}/`)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao deletar tarefa de exercício: ", err)
    throw err;
  })
}

export const getFitData = () => {
  return fitApi
    .get(`fit/fitdata/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar dados de fit: ", err);
      throw err;
    });
};


export const createFitData = (data:IFitData) => {
  return fitApi
    .post(`fit/fitdata/`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar dados de fit: ", err);
      throw err;
    });
};