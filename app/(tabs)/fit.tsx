import Habit from "@/components/Habit";
import ToDo from "@/components/ToDo";
import StepCounter from "@/components/StepCounter";
import Tabs from "@/components/Tabs";
import { Colors } from "@/constants/Colors";
import useFit from "@/hooks/useFit";
import useHabit from "@/hooks/useHabit";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import useTodo from "@/hooks/useToDo";

export default function Fit() {
  const {
    TABS,
    currentTab,
    setCurrentTab,
    fitHabits,
    habitFitError,
    habitFitIsLoading,
    addFitPositiveCounterMutation,
    addFitNegativeCounterMutation,
  } = useHabit();

  const { totalCalories, totalDistance, totalSteps } = useFit();
  const {
    fitToDo,
    toDoFitError,
    toggleMarkToDoFit
  } = useTodo()


  return (
    <SafeAreaView style={{ paddingHorizontal: 30, flexGrow: 1 }}>
      <Header />
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <StepCounter steps={totalSteps} goal={1050} size={210} strokeWidth={15} />
      </View>
      <View style={styles.otherFitInfoContainer}>
        <View style={styles.otherFitInfoContent}>
          <Text style={styles.otherFitInfoText}>{totalCalories.toFixed(2)}</Text>
          <Text style={styles.otherFitInfoUnitText}>KCal</Text>
        </View>
        <View style={styles.otherFitInfoContent}>
          <Text style={styles.otherFitInfoText}>{totalDistance.toFixed(2)}</Text>
          <Text style={styles.otherFitInfoUnitText}>m</Text>
        </View>
      </View>

      <View style={{ marginTop: 30, marginBottom: 25 }}>
        <Tabs tabs={TABS} initialTabKey="habit" onTabChange={(key: string) => setCurrentTab(key)} />
      </View>

      {habitFitIsLoading && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={50} />
        </View>
      )}

      {currentTab === "habit" && (
        <FlatList
          data={fitHabits || []}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.habitTodoContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Habit
              habit={item}
              onPressPositive={() => {
                addFitPositiveCounterMutation.mutate(item.id);
              }}
              onPressEdit={() => {}}
              onPressNegative={() => {
                addFitNegativeCounterMutation.mutate(item.id);
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
              Nenhum hábito encontrado.
            </Text>
          }
        />
      )}{currentTab === "todo" && (
          <FlatList
            data={fitToDo}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.habitTodoContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ToDo
                todo={item}
                onPressEdit={() => {}}
                onPressMarkToggle={() => toggleMarkToDoFit.mutate(item.id)}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
                Nenhuma tarefa encontrado.
              </Text>
            }
          />
        )}
      {habitFitError && (
        <View style={styles.errorContent}>
          <Text style={{ color: Colors.light.redColor }}>Não foi possível carregar os hábitos</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  habitTodoContainer: {
    gap: 10,
    width: "100%",
    paddingBottom: 230,
  },
  errorContent: {
    alignItems: "center",
  },
  otherFitInfoContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    gap: 20,
  },
  otherFitInfoContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 5,
    backgroundColor: Colors.light.lightGray,
  },
  otherFitInfoText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  otherFitInfoUnitText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
});
