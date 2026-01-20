import { createApi } from "./http";

const IP = process.env.EXPO_PUBLIC_IP_MAQUINA;

export const nutriApi = createApi(`http://${IP}:8001/api/v1/`);
export const fitApi = createApi(`http://${IP}:8002/api/v1/`);
export const profileApi = createApi(`http://${IP}:8081/api/`);
