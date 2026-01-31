import { storage } from "@/service/storage";
import Axios from "axios";

export const createApi = (baseURL: string) => {
  const api = Axios.create({ baseURL });

  api.interceptors.request.use(
    async (config) => {
      const tokens = await storage.getTokens();

      // console.log("tokens", tokens);
      console.log(config.url);

      if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const refresh = await storage.getRefreshToken();

        if (!refresh) {
          await storage.removeAccessToken();
          await storage.removeRefreshToken();
          return Promise.reject(error);
        }

        try {
          const response = await Axios.post(
            `${process.env.EXPO_PUBLIC_PROFILE_API}/profiles/token/refresh/`,
            { DashboardProfileRefresh: refresh }
          );

          const newAccess = response.data.DashboardProfileAccess;
          const newRefresh = response.data.DashboardProfileRefresh;

          await storage.saveTokens({
            DashboardProfileAccess: newAccess,
            DashboardProfileRefresh: newRefresh,
          });

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

          return api(originalRequest);
        } catch (err) {
          await storage.removeAccessToken();
          await storage.removeRefreshToken();
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
