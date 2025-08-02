import { googleLogin } from "@/lib/axios";
import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import useStorage from "./useStorage";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { saveTokens, removeAccessToken, removeRefreshToken, getAccessToken } = useStorage();


  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAccessToken();
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  GoogleSignin.configure({
    webClientId: `${process.env.EXPO_PUBLIC_WEB_CLIENT}`,
  });


  const googleLoginMutation = useMutation({
    mutationFn: (googleToken: string) => googleLogin(googleToken),
    onSuccess: (data) => {
      saveTokens(data);
      setIsAuthenticated(true)
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
      setIsAuthenticated(false)
      router.push('/login')
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return {
    GoogleSignin,
    handleGoogleSignIn,
    handleLogout,
    isAuthenticated,
    loading,
  };
};

export default useAuth;
