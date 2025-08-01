import { googleLogin } from "@/lib/axios";
import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import useStorage from "./useStorage";

const useGoogle = () => {
  GoogleSignin.configure({
    webClientId: `${process.env.EXPO_PUBLIC_WEB_CLIENT}`,
  });

  const { saveTokens, removeAccessToken, removeRefreshToken } = useStorage();

  const googleLoginMutation = useMutation({
    mutationFn: (googleToken: string) => googleLogin(googleToken),
    onSuccess: (data) => {
      saveTokens(data);
      router.push("/(tabs)");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken;
        console.log(idToken);
        if (idToken !== null) {
          googleLoginMutation.mutate(idToken);
        } else {
          console.error("Token não pode ser null");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut(); 
      await removeAccessToken()
      await removeRefreshToken()
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return {
    GoogleSignin,
    handleGoogleSignIn,
    handleLogout,
  };
};

export default useGoogle;
