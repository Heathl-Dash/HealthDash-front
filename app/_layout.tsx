import { Colors } from "@/constants/Colors";
import { initDB } from "@/storage/sqliteHelpers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast, { BaseToast, BaseToastProps, ErrorToast } from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftWidth: 0, backgroundColor: Colors.light.success, borderRadius: 8}}
        contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: Colors.light.success }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{borderLeftWidth: 0, backgroundColor: Colors.light.fail, borderRadius: 8}}
        contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: Colors.light.fail, borderRadius: 8 }}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    // tomatoToast: ({ text1, props }) => (
    //   <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
    //     <Text>{text1}</Text>
    //     <Text>{props.uuid}</Text>
    //   </View>
    // )
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SQLiteProvider databaseName="fit.db" onInit={initDB}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
              <Toast config={toastConfig} />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </SQLiteProvider>
      </QueryClientProvider>
    </>
  );
}
