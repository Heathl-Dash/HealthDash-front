import Habit from "@/components/Habit";
import Header from "@/components/Header";
import IMCCard from "@/components/IMCCard";
import Tabs from "@/components/Tabs";
import ToDo from "@/components/ToDo";
import { Colors } from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import useHabit from "@/hooks/useHabit";
import useIMC from "@/hooks/useIMC";
import useTodo from "@/hooks/useToDo";
import useWater from "@/hooks/useWater";
import { Redirect, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AddBottleModal from "../../components/AddBottleModal";
import WaterButton from "../../components/WaterButton";
import WaterModal from "../../components/WaterModal";
export default function HomeScreen() {
  const {
    handleCloseAddBottleModal,
    handleCloseWaterModal,
    openAddBottle,
    openWaterModal,
    updateWaterGoalWithBottle,
    waterGoal,
    waterModalIsOpen,
    addBottleModalIsOpen,
    editBottleModalIsOpen,
    bottleToEdit,
    openEditBottleModal,
    handleEditBottle,
    handleCloseEditBottleModal
  } = useWater();

  const {
    TABS,
    currentTab,
    setCurrentTab,
    allHabits,
    addFitNegativeCounterMutation,
    addFitPositiveCounterMutation,
    addNutriNegativeCounterMutation,
    addNutriPositiveCounterMutation,
  } = useHabit();

  const {
    nutriToDo,
    toDoNutriError,
    isNutriToDoLoading,
    toggleMarkToDoNutri,
    toggleMarkToDoFit,
    allTodos,
  } = useTodo();

  const { imcData, loading } = useIMC();

  const { isAuthenticated, loading: isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={[styles.container, { flexGrow: 1 }]}>
      <Header />
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", padding: 5 }}>
          <IMCCard
            calc_IMC={imcData?.calc_IMC || null}
            imc_classification={imcData?.imc_classification}
          />
        </View>
        <View style={{ width: "50%", padding: 5 }}>
          <WaterButton
            mlDrinked={waterGoal?.ml_drinked ?? 0}
            waterGoal={waterGoal?.ml_goal ?? 2000}
            onPress={openWaterModal}
          />
        </View>
      </View>

      <View style={{ marginTop: 35, marginBottom: 25 }}>
        <Tabs tabs={TABS} initialTabKey="habit" onTabChange={(key: string) => setCurrentTab(key)} />
      </View>

      <TouchableOpacity
        onPress={() => {
          router.push("/login");
        }}
      >
        {" "}
        <Text style={{ color: Colors.light.darkGray }}>tela login</Text>{" "}
      </TouchableOpacity>

      {currentTab === "habit" && (
        <FlatList
          data={allHabits || []}
          keyExtractor={(item) => `${item.source}-${item.id}`}
          contentContainerStyle={styles.habitTodoContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Habit
              habit={item}
              onPressPositive={() => {
                if (item.source === "fit") {
                  addFitPositiveCounterMutation.mutate(item.id);
                } else if (item.source === "nutri") {
                  addNutriPositiveCounterMutation.mutate(item.id);
                }
              }}
              onPressEdit={() => {}}
              onPressNegative={() => {
                if (item.source === "fit") {
                  addFitNegativeCounterMutation.mutate(item.id);
                } else if (item.source === "nutri") {
                  addNutriNegativeCounterMutation.mutate(item.id);
                }
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
              Nenhum hábito encontrado.
            </Text>
          }
        />
      )}
      {currentTab === "todo" && (
        <FlatList
          data={allTodos}
          keyExtractor={(item) => `${item.source}-${item.id}`}
          contentContainerStyle={styles.habitTodoContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ToDo
              todo={item}
              onPressEdit={() => {}}
              onPressMarkToggle={() => {
                if (item.source === "nutri") {
                  toggleMarkToDoNutri.mutate(item.id);
                } else if (item.source === "fit") {
                  toggleMarkToDoFit.mutate(item.id);
                } else {
                  console.warn("Tipo de tarefa desconhecido:", item);
                }
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
              Nenhuma tarefa encontrada.
            </Text>
          }
        />
      )}

      <WaterModal
        bottles={waterGoal?.bottles || []}
        onClose={handleCloseWaterModal}
        visible={waterModalIsOpen}
        onPressBottleButton={updateWaterGoalWithBottle}
        onPressAddBottle={openAddBottle}
        onPressEditBottle={handleEditBottle}
      />
      <AddBottleModal onClose={handleCloseAddBottleModal} visible={addBottleModalIsOpen} />

      <AddBottleModal onClose={handleCloseEditBottleModal} visible={editBottleModalIsOpen} bottleToEdit={bottleToEdit}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  text: {
    color: "black",
    marginBottom: 20,
  },
  habitTodoContainer: {
    gap: 10,
    width: "100%",
    paddingBottom: 230,
  },
  errorContent: {
    alignItems: "center",
  },
});
