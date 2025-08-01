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

  return{
    saveTokens,
    getAccessToken,
    getRefreshToken
  }

}

export default useStorage