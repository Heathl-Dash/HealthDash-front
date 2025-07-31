import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GoogleIcon from "@/assets/icons/google.svg";
import { Stack } from "expo-router";

import { GoogleSignin, User, isSuccessResponse} from '@react-native-google-signin/google-signin'


const LogoPlaceholder = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoCircle}>
      <Text style={styles.logoText}>HD</Text>
    </View>
  </View>
);

GoogleSignin.configure()

const LoginScreen = () => {
  const handleGoogleLogin = () => {
    console.log("Login com Google");
  };

  const [auth, setAuth] = useState<User | null>(null)

  async function handleGoogleSignIn(){
    try{
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if(isSuccessResponse(response)){
        console.log(response.data)
      }
    }catch(err){
      console.log(err)
    }
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
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}
          >
            <GoogleIcon width={30} height={30} />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.googleButtonText}>Entrar com Google</Text>
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.primary, 
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
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
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  googleIconText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.darkGray,
    fontFamily: "System",
  },
  termsText: {
    fontSize: 12,
    color: "#BEBEBE", 
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
    fontFamily: "System",
  },
  linkText: {
    color: Colors.light.primary,
    fontWeight: "500",
  },
});

export default LoginScreen;
