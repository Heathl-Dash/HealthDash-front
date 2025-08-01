import { logoutProfile } from "@/lib/axios";
import { router } from "expo-router";

export const useLogout = () => {
  const logout = async () => {
    try {
      await logoutProfile();
      router.replace('/login');
    } catch (err) {
      console.error("Erro ao sair da conta:", err);
    }
  };

  return { logout };
};

export default useLogout;
