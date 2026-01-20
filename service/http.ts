import { storage } from "@/service/storage";
import Axios from "axios";

export const createApi = (baseURL: string) => {
  const api = Axios.create({ baseURL });

  api.interceptors.request.use(
    async (config) => {
      const tokens = await storage.getTokens();

      console.log("tokens", tokens);

      if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // api.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     if (error.response) {
  //       // The server responded with a status code outside the 2xx range
  //       // console.log(error.response.data);
  //       // console.log(error.response.status);
  //     } else if (error.request) {
  //       // The request was made but no response was received (e.g., network error, server down)
  //       // console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       // console.log("Error", error.message);
  //     }

  //     const originalRequest = error.config;

  //     if (
  //       (error.response?.status === 401 || error.response?.status === 403) &&
  //       !originalRequest._retry
  //     ) {
  //       originalRequest._retry = true;

  //       // console.log("tentando refresh");

  //       const refresh = await storage.getRefreshToken();

  //       if (!refresh) {
  //         await storage.removeAccessToken();
  //         await storage.removeRefreshToken();
  //         return Promise.reject(error);
  //       }

  //       try {
  //         const response = await Axios.post(
  //           `${process.env.EXPO_PUBLIC_PROFILE_API}/profiles/token/refresh/`,
  //           { DashboardProfileRefresh: refresh }
  //         );

  //         const newAccess = response.data.DashboardProfileAccess;
  //         const newRefresh = response.data.DashboardProfileRefresh;

  //         await storage.setAccessToken(newAccess);
  //         await storage.setRefreshToken(newRefresh);

  //         originalRequest.headers.Authorization = `Bearer ${newAccess}`;

  //         return api(originalRequest);
  //       } catch (err) {
  //         await storage.removeAccessToken();
  //         await storage.removeRefreshToken();
  //         return Promise.reject(err);
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  return api;
};
