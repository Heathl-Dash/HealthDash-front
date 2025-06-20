import { Colors } from "@/constants/Colors";
import { FontAwesome5, MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            ...styles.tabBar,
            position: "absolute",
          },
          default: { ...styles.tabBar },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tab_selected_base, focused && styles.tab_selected_active]}>
              <MaterialCommunityIcons
                size={32}
                name="home-heart"
                color={focused ? "white" : Colors.light.darkgray}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tab_label, focused && { color: Colors.light.primary }]}>Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="nutri"
        options={{
          title: "Nutri",
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tab_selected_base, focused && styles.tab_selected_active]}>
              <FontAwesome5
                size={24}
                name="apple-alt"
                color={focused ? "white" : Colors.light.darkgray}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tab_label, focused && { color: Colors.light.primary }]}>
              Nutrição
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="fit"
        options={{
          title: "Nutri",
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tab_selected_base, focused && styles.tab_selected_active]}>
              <MaterialCommunityIcons
                size={28}
                name="shoe-sneaker"
                color={focused ? "white" : Colors.light.darkgray}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tab_label, focused && { color: Colors.light.primary }]}>
              Exercícios
            </Text>
          ),
        }}
      />
       <Tabs.Screen
        name="user"
        options={{
          title: "user",
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tab_selected_base, focused && styles.tab_selected_active]}>
              <FontAwesome6
                size={20}
                name="user-large"
                color={focused ? "white" : Colors.light.darkgray}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tab_label, focused && { color: Colors.light.primary }]}>
              Eu
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 10,
  },
  tab_selected_base: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  tab_selected_active: {
    backgroundColor: Colors.light.primary,
    borderRadius: 50,
  },
  tab_label: {
    color: Colors.light.darkgray,
  },
});
