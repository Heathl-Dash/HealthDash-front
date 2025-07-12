import React, { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import Tab from "../Tab";

export interface TabItem {
  key: string;
  label: string;
  component?: ReactNode
}

interface TabsProps {
  tabs: TabItem[];
  initialTabKey?: string;
  onTabChange?: (tabKey: string) => void;
}

const Tabs = ({ tabs, initialTabKey, onTabChange }: TabsProps) => {
  const [activeKey, setActiveKey] = useState(initialTabKey ?? tabs[0]?.key ?? "");

  const handleTabPress = (key: string) => {
    setActiveKey(key);
    onTabChange?.(key);
  };
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          label={tab.label}
          isActive={tab.key == activeKey}
          onPress={() => handleTabPress(tab.key)}
        ></Tab>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 0,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
