import CustomButton from "@/components/CustomButton";
import Habit from "@/components/Habit";
import Tabs, { TabItem } from "@/components/Tabs";
import ToDo from "@/components/ToDo";
import { Colors } from "@/constants/Colors";
import useHabit from "@/hooks/useHabit";
import useTodo from "@/hooks/useToDo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AttachSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectHabit: (habit: IHabit) => void;
  onSelectTodo: (todo: IToDo) => void;
}

const AttachSelectorModal = ({
  visible,
  onClose,
  onSelectHabit,
  onSelectTodo,
}: AttachSelectorModalProps) => {
  const [currentTab, setCurrentTab] = useState<"habit" | "todo">("habit");
  const [sourceFilter, setSourceFilter] = useState<"all" | "nutri" | "fit">("all");

  const { allHabits, habitFitIsLoading, habitNutriIsLoading } = useHabit();
  const { allTodos, isFitToDoLoading, isNutriToDoLoading } = useTodo();

  const TABS: TabItem[] = [
    { key: "habit", label: "Hábitos" },
    { key: "todo", label: "Tarefas" },
  ];

  const filteredHabits = useMemo(() => {
    if (sourceFilter === "all") return allHabits;
    return allHabits.filter((habit) => habit.source === sourceFilter);
  }, [allHabits, sourceFilter]);

  const filteredTodos = useMemo(() => {
    if (sourceFilter === "all") return allTodos;
    return allTodos.filter((todo) => todo.source === sourceFilter);
  }, [allTodos, sourceFilter]);

  const handleOpen = () => {
    setCurrentTab("habit");
    setSourceFilter("all");
  };

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={onClose}
      onShow={handleOpen}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={22} color={Colors.light.darkGray} />
            </TouchableOpacity>
            <Text style={styles.title}>Anexar à publicação</Text>
            <View style={styles.spacer} />
          </View>

          <Tabs
            key={`attach-tabs-${currentTab}`}
            tabs={TABS}
            initialTabKey={currentTab}
            onTabChange={(key) => setCurrentTab(key as "habit" | "todo")}
          />

          <View style={styles.subFilterRow}>
            <CustomButton
              title="Todos"
              onPress={() => setSourceFilter("all")}
              variant={sourceFilter === "all" ? "secondary" : "ghost"}
              shape="rect"
              style={styles.subFilterButton}
            />
            <CustomButton
              title="Nutri"
              onPress={() => setSourceFilter("nutri")}
              variant={sourceFilter === "nutri" ? "secondary" : "ghost"}
              shape="rect"
              style={styles.subFilterButton}
            />
            <CustomButton
              title="Fit"
              onPress={() => setSourceFilter("fit")}
              variant={sourceFilter === "fit" ? "secondary" : "ghost"}
              shape="rect"
              style={styles.subFilterButton}
            />
          </View>

          <ScrollView style={styles.listWrapper} contentContainerStyle={styles.listContainer}>
            {currentTab === "habit" ? (
              habitNutriIsLoading || habitFitIsLoading ? (
                <Text style={styles.listEmptyText}>Carregando hábitos...</Text>
              ) : filteredHabits.length === 0 ? (
                <Text style={styles.listEmptyText}>Nenhum hábito encontrado.</Text>
              ) : (
                filteredHabits.map((habit) => (
                  <View key={habit.id} style={styles.listItem}>
                    <Habit
                      habit={habit}
                      onPressEdit={() => onSelectHabit(habit)}
                      onPressPositive={() => onSelectHabit(habit)}
                      onPressNegative={() => onSelectHabit(habit)}
                    />
                  </View>
                ))
              )
            ) : isNutriToDoLoading || isFitToDoLoading ? (
              <Text style={styles.listEmptyText}>Carregando tarefas...</Text>
            ) : filteredTodos.length === 0 ? (
              <Text style={styles.listEmptyText}>Nenhuma tarefa encontrada.</Text>
            ) : (
              filteredTodos.map((todo) => (
                <View key={todo.id} style={styles.listItem}>
                  <ToDo
                    todo={todo}
                    onPressEdit={() => onSelectTodo(todo)}
                    onPressMarkToggle={() => onSelectTodo(todo)}
                  />
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    width: "88%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    gap: 20,
    height: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: Colors.light.darkGray,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  spacer: {
    flex: 1,
  },
  subFilterRow: {
    flexDirection: "row",
    gap: 10,
  },
  subFilterButton: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    gap: 12,
    paddingBottom: 8,
  },
  listItem: {
    width: "100%",
  },
  listEmptyText: {
    color: Colors.light.darkGray,
    textAlign: "center",
    paddingVertical: 16,
  },
});

export default AttachSelectorModal;
