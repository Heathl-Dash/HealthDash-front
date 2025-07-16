import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

export default function User() {
  return (
    <SafeAreaView>
      <Header/>
      <Text>User</Text>
    </SafeAreaView>
  );
}
