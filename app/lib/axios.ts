import Axios from "axios";

const apiGateway = Axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP_MAQUINA}:8004/api/v1/`,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY}`,
  },
});


export const getBottles = () => {
  return apiGateway
    .get("nutri/water_bottle/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar garrafas: ", err);
      throw err;
    });
};
