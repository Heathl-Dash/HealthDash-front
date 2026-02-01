import GoogleIcon from "@/assets/icons/google.svg";
import HealthDashLogo from "@/assets/images/healthDashLogo48.svg";
import { Colors } from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LogoPlaceholder = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoCircle}>
      <HealthDashLogo />
    </View>
  </View>
);

const LoginScreen = () => {
  const { handleLogin, isAuthenticated, loading, request } = useAuth();

  if (loading) {
    return(
      <ActivityIndicator/>
    )
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.content}>
        <View style={styles.logoSection}>
          <LogoPlaceholder />
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Bem-vindo ao HealthDash</Text>
          <Text style={styles.subtitle}>Crie hábitos saudáveis e cuide do seu corpo!</Text>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[styles.googleButton, !request && { opacity: 0.5 }]}
            onPress={handleLogin}
            disabled={!request}
            activeOpacity={0.8}
          >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.googleButtonText}>Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoSection: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoCircle: {
    width: 125,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeSection: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.light.darkGray,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.mediumGray,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "System",
  },
  actionSection: {
    flex: 0.3,
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.darkGray,
    fontFamily: "System",
  },
});

export default LoginScreen;
