import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Collection() {
  const { id } = useLocalSearchParams();
  const collectionId = Array.isArray(id) ? id[0] : id;

  return (
    <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 30 }}>
      <Stack.Screen options={{ title: "Salvos" }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
