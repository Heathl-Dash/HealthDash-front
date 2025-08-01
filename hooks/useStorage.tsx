import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const saveTokens = async (data: {
    DashboardProfileRefresh: string;
    DashboardProfileAccess: string;
  }) => {
    try {
      await AsyncStorage.setItem("access", data.DashboardProfileAccess);
      await AsyncStorage.setItem("refresh", data.DashboardProfileRefresh);
    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  };

  const getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem("access");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log("Erro ao ler access token:", error);
    }
  };

  const getRefreshToken = async () => {
    try {
      const value = await AsyncStorage.getItem("refresh");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log("Erro ao ler refresh token:", error);
    }
  };

  const getTokens = async () => {
    try {
      const access = await AsyncStorage.getItem("access");
      const refresh = await AsyncStorage.getItem("refresh");
      return { access, refresh };
    } catch (error) {
      console.log("Erro ao ler os tokens:", error);
      return null;
    }
  };

  const setAccessToken = async (newAccessToken: string) => {
    try {
      await AsyncStorage.setItem("access", newAccessToken);
    } catch (error) {
      console.log("Erro ao salvar access token:", error);
    }
  };

  const setRefreshToken = async (newRefreshToken: string) => {
    try {
      await AsyncStorage.setItem("refresh", newRefreshToken);
    } catch (error) {
      console.log("Erro ao salvar refresh token:", error);
    }
  };

  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem("access");
    } catch (error) {
      console.log("Erro ao remover access token:", error);
    }
  };

  const removeRefreshToken = async () => {
    try {
      await AsyncStorage.removeItem("refresh");
    } catch (error) {
      console.log("Erro ao remover refresh token:", error);
    }
  };

  return {
    saveTokens,
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
    getTokens,
    removeAccessToken,
    removeRefreshToken,
  };
};

export default useStorage;
