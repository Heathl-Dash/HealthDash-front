import Habit from "@/components/Habit";
import Tabs from "@/components/Tabs";
import { Colors } from "@/constants/Colors";
import useHabit from "@/hooks/useHabit";
import useWater from "@/hooks/useWater";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AddBottleModal from "../../components/AddBottleModal";
import WaterButton from "../../components/WaterButton";
import WaterModal from "../../components/WaterModal";
import Header from "@/components/Header";

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

  return (
    <SafeAreaView style={[styles.container, {flexGrow: 1}]}>
      <Header/>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", padding: 5 }}></View>
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

      {currentTab === "habit" ? (
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
      ) : (
        <View style={styles.habitTodoContainer}>
          <Text style={{ color: "black" }}>Tarefas</Text>
        </View>
      )}

      <WaterModal
        bottles={waterGoal?.bottles || []}
        onClose={handleCloseWaterModal}
        visible={waterModalIsOpen}
        onPressBottleButton={updateWaterGoalWithBottle}
        onPressAddBottle={openAddBottle}
      />
      <AddBottleModal onClose={handleCloseAddBottleModal} visible={addBottleModalIsOpen} />
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
