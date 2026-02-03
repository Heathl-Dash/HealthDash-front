import { storage } from "@/service/storage";
import Axios from "axios";
import { router } from "expo-router";


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
          const keycloakUrl = process.env.EXPO_PUBLIC_KEYCLOAK_URL;
          const realm = process.env.EXPO_PUBLIC_KEYCLOAK_REALM;
          const clientId = process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID;
          const tokenEndpoint = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`;

          const params = new URLSearchParams({
            grant_type: "refresh_token",
            client_id: clientId || "",
            refresh_token: refresh,
          });

          const response = await Axios.post(tokenEndpoint, params.toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          });

          const newAccess = response.data.access_token;
          const newRefresh = response.data.refresh_token ?? refresh;

          await storage.saveTokens({
            DashboardProfileAccess: newAccess,
            DashboardProfileRefresh: newRefresh,
          });

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

          return api(originalRequest);
        } catch (err) {
          await storage.removeAccessToken();
          await storage.removeRefreshToken();
          router.replace("/login");
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
