import Axios from "axios";

const apiGateway = Axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP_MAQUINA}:8004/api/v1/`,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY}`,
  },
});

export const getWaterGoal = ()=> {
  return apiGateway
  .get<IWaterGoal>("nutri/water_goal/")
  .then((res) => res.data)
  .catch((err) => {
    console.error("Erro ao buscar meta de agua: ", err);
    throw err;
  });
};
export const editWaterGoal = (data:Partial<IWaterGoal>)=> {
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
      console.error("Erro ao buscar garrafas: ", err);
      throw err;
    });
};