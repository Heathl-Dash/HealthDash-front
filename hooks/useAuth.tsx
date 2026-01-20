import { storage } from "@/service/storage";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

// --- CONFIGURAÇÕES DO KEYCLOAK ---
const KEYCLOAK_URL = process.env.EXPO_PUBLIC_KEYCLOAK_URL;
const REALM = process.env.EXPO_PUBLIC_KEYCLOAK_REALM;
const CLIENT_ID = process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID;

const discovery = {
  authorizationEndpoint: `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/auth`,
  tokenEndpoint: `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
  revocationEndpoint: `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/revoke`,
  endSessionEndpoint: `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/logout`,
};

const redirectUri = makeRedirectUri({
  scheme: "healthdash",
  path: "login",
});

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID!,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getAccessToken();
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      exchangeCodeForToken(code);
    } else if (response?.type === "error") {
      console.error("Erro no login:", response.error);
    }
  }, [response]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const redirectUri = makeRedirectUri({ scheme: "healthdash", path: "login" });

      console.log("redirectUrl", redirectUri);

      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID!,
        code: code,
        redirect_uri: redirectUri,
        code_verifier: request?.codeVerifier || "",
      });

      const res = await fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const data = await res.json();
      const access = data.access_token;
      const refresh = data.refresh_token;

      console.log("auth", { access, refresh });

      if (data.access_token) {
        await storage.saveTokens({
          DashboardProfileAccess: access,
          DashboardProfileRefresh: refresh,
        });

        setIsAuthenticated(true);
        router.replace("/(tabs)");
      } else {
        console.error("Falha ao obter token:", data);
      }
    } catch (error) {
      console.error("Erro na troca de token:", error);
    }
  };

  const handleLogin = () => {
    promptAsync();
  };

  const handleLogout = async () => {
    try {
      const refreshToken = await storage.getRefreshToken();

      if (refreshToken) {
        await fetch(discovery.endSessionEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: CLIENT_ID!,
            refresh_token: refreshToken,
          }).toString(),
        }).catch((err) => console.log("Erro logout remoto", err));
      }

      await storage.removeAccessToken();
      await storage.removeRefreshToken();
      setIsAuthenticated(false);

      router.replace("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return {
    handleLogin,
    handleLogout,
    isAuthenticated,
    loading,
    request,
  };
};

export default useAuth;
