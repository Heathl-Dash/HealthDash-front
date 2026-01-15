import AsyncStorage from "@react-native-async-storage/async-storage";

type Tokens = {
  DashboardProfileRefresh: string;
  DashboardProfileAccess: string;
};

export const storage = {
  async saveTokens(data: Tokens) {
    try {
      await AsyncStorage.setItem("access", data.DashboardProfileAccess);
      await AsyncStorage.setItem("refresh", data.DashboardProfileRefresh);
    } catch (error) {
      console.log("Erro ao salvar tokens:", error);
    }
  },

  async getAccessToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("access");
    } catch (error) {
      console.log("Erro ao ler access token:", error);
      return null;
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("refresh");
    } catch (error) {
      console.log("Erro ao ler refresh token:", error);
      return null;
    }
  },

  async getTokens() {
    try {
      const access = await AsyncStorage.getItem("access");
      const refresh = await AsyncStorage.getItem("refresh");
      return { access, refresh };
    } catch (error) {
      console.log("Erro ao ler tokens:", error);
      return null;
    }
  },

  async setAccessToken(token: string) {
    try {
      await AsyncStorage.setItem("access", token);
    } catch (error) {
      console.log("Erro ao salvar access token:", error);
    }
  },

  async setRefreshToken(token: string) {
    try {
      await AsyncStorage.setItem("refresh", token);
    } catch (error) {
      console.log("Erro ao salvar refresh token:", error);
    }
  },

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem("access");
    } catch (error) {
      console.log("Erro ao remover access token:", error);
    }
  },

  async removeRefreshToken() {
    try {
      await AsyncStorage.removeItem("refresh");
    } catch (error) {
      console.log("Erro ao remover refresh token:", error);
    }
  },
};