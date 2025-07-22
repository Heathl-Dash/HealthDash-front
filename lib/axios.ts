import Axios from "axios";

const apiGateway = Axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP_MAQUINA}:8004/api/v1/`,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY}`,
  },
});

export const getWaterGoal = () => {
  return apiGateway
    .get<IWaterGoal>("nutri/water_goal/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar meta de agua: ", err);
      throw err;
    });
};
export const editWaterGoal = (data: Partial<IWaterGoal>) => {
  return apiGateway
    .patch<IWaterGoal>("nutri/water_goal/", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar meta de agua: ", err);
      throw err;
    });
};

export const getBottles = () => {
  return apiGateway
    .get("nutri/water_bottle/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar garrafas: ", err);
      throw err;
    });
};

export const createBottles = (data: Partial<IBottle>) => {
  return apiGateway
    .post("nutri/water_bottle/", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao criar garrafas: ", err);
      throw err;
    });
};

export const postNutritionInfo = (data: { aliment: string }) => {
  return apiGateway
    .post("nutri/nutrition-info-ai-request", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao pesquisar informações nutricionais: ", err);
      throw err;
    });
};

export const getNutriHabits = () => {
  return apiGateway
    .get<IHabit[]>("nutri/habit/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar hábitos nutricionais: ", err);
      throw err;
    });
};

export const addNutriPositiveCounter = (id: number) => {
  return apiGateway
    .patch(`nutri/habit/${id}/add-positive-counter`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador positivo de habito nutricional: ", err);
      throw err;
    });
};

export const addNutriNegativeCounter = (id: number) => {
  return apiGateway
    .patch(`nutri/habit/${id}/add-negative-counter`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador negativo de habito nutricional: ", err);
      throw err;
    });
};


export const getFitHabits = () => {
  return apiGateway
    .get("fit/habit/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar hábitos de exercício: ", err);
      throw err;
    });
};

export const addFitPositiveCounter = (id: number) => {
  return apiGateway
    .patch(`fit/habit/${id}/add_positive_counter/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador positivo de habito de exercício: ", err);
      throw err;
    });
};

export const addFitNegativeCounter = (id: number) => {
  return apiGateway
    .patch(`fit/habit/${id}/add_negative_counter/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador negativo de habito de exercício: ", err);
      throw err;
    });
};

export const getNutriToDo = () => {
  return apiGateway
    .get<IToDo[]>("nutri/todo/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar tarefas nutricionais: ", err);
      throw err;
    });
};