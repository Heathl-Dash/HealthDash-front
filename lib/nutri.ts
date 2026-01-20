import { nutriApi } from "@/service/apis";
import { HabitForm } from "@/dto/habit.dto";
import { ToDoForm } from "@/dto/todo.dto";

export const getWaterGoal = () => {
  return nutriApi
    .get<IWaterGoal>("nutri/water_goal/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar meta de agua: ", err);
      throw err;
    });
};
export const editWaterGoal = (data: Partial<IWaterGoal>) => {
  return nutriApi
    .patch<IWaterGoal>("nutri/water_goal/", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao editar meta de agua: ", err);
      throw err;
    });
};

export const getWaterIntakes = (today:string) => {
  return nutriApi
  .get('nutri/water_goal/intakes/', {params: {reference: today}})
  .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar intakes de consumo de água: ", err);
      throw err;
    });
}


export const getBottles = () => {
  return nutriApi
    .get("nutri/water_bottle/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar garrafas: ", err);
      throw err;
    });
};

export const editWaterBottle = (id: number, data: Partial<IBottle>) => {
  return nutriApi
    .patch(`nutri/water_bottle/${id}`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao editar garrafa ", err);
      throw err;
    });
};


export const deleteWaterBottle = (id:number) => {
  return nutriApi
    .delete(`nutri/water_bottle/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao deletar garrafa ", err);
      throw err;
    });
}

export const createBottles = (data: Partial<IBottle>) => {
  return nutriApi
    .post("nutri/water_bottle/", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao criar garrafas: ", err);
      throw err;
    });
};

export const postNutritionInfo = (data: { aliment: string }) => {
  return nutriApi
    .post("nutri/nutrition-info-ai-request", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao pesquisar informações nutricionais: ", err);
      throw err;
    });
};

export const getNutriHabits = () => {
  return nutriApi
    .get<IHabit[]>("nutri/habit/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar hábitos nutricionais: ", err);
      throw err;
    });
};

export const addNutriPositiveCounter = (id: number) => {
  return nutriApi
    .patch(`nutri/habit/${id}/add-positive-counter`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador positivo de habito nutricional: ", err);
      throw err;
    });
};

export const addNutriNegativeCounter = (id: number) => {
  return nutriApi
    .patch(`nutri/habit/${id}/add-negative-counter`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador negativo de habito nutricional: ", err);
      throw err;
    });
};

export const getNutriToDo = () => {
  return nutriApi
    .get<IToDo[]>("nutri/todo/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar tarefas nutricionais: ", err);
      throw err;
    });
};

export const nutriToggleMarkTodoDone = (id: number) => {
  return nutriApi
    .patch(`nutri/todo/${id}/done-toggle`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao trocar o valor do marcador de feito em tarefas nutricionais: ", err);
      throw err;
    });
};

export const createNutriHabit = (habitData: HabitForm) => {
  return nutriApi
  .post(`nutri/habit/`, habitData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao criar hábito de nutrição: ", err)
    throw err;
  })
};

export const editNutriHabit = (habitData: HabitForm, id:number) => {
  return nutriApi
  .patch(`nutri/habit/${id}`, habitData)
  .then(res=> res.data)
  .catch(err => {
    console.error("Erro ao alterar hábito de nutrição: ", err)
    throw err;
  })
};

export const deleteNutriHabit = (id:number) => {
  return nutriApi
  .delete(`nutri/habit/${id}`)
  .then(res=>res.data)
  .catch(err=>{
    console.error("Erro ao deletar hábito de nutrição: ", err)
    throw err;
  })
}

export const createNutriToDo = (toDoData:ToDoForm) => {
  return nutriApi
  .post(`nutri/todo/`, toDoData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao criar tarefa de nutrição: ", err)
    throw err;
  })
};

export const editNutriToDo = (toDoData:ToDoForm, id:number) => {
  return nutriApi
  .patch(`nutri/todo/${id}`, toDoData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao editar tarefa de nutrição: ", err)
    throw err;
  })
};

export const deleteNutriToDo = (id:number) => {
  return nutriApi
  .delete(`nutri/todo/${id}`)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao deletar tarefa de nutrição: ", err)
    throw err;
  })
}