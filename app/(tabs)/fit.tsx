import Habit from "@/components/Habit";
import StepCounter from "@/components/StepCounter";
import Tabs from "@/components/Tabs";
import { Colors } from "@/constants/Colors";
import { getBodySensorPermission, getStepCounterPermission } from "@/hooks/permission";
import useHabit from "@/hooks/useHabit";
import useStepSync from "@/hooks/useStepSync";
import { getFitInfosDataForToday } from "@/storage/sqliteHelpers";
import {
  isSensorWorking,
  isStepCountingSupported,
  parseStepData,
  startStepCounterUpdate,
  stopStepCounterUpdate,
  type ParsedStepCountData,
} from "@dongminyu/react-native-step-counter";
import React from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

type SensorType<T = typeof Platform.OS> = T extends "ios"
  ? "CMPedometer"
  : T extends "android"
    ? "Step Counter" | "Accelerometer"
    : "NONE";

type SensorName = SensorType<Platform["OS"]>;

/** Setting the initial state of the additionalInfo object. */
const initState = {
  stepsString: "0 steps",
  calories: "0 kCal",
  distance: "0.0 m",
};

type AdditionalInfo = Partial<ParsedStepCountData>;

/**
 * @returns {React.ReactComponentElement} - Returns Application Component.
 * @description This module represents the root component of the app.
 * 1. It imports the necessary components and libraries.
 * 2. It defines the initial state of the additionalInfo state.
 * 3. It defines the functions that will be used in the app.
 * 4. It uses the useState hook to define the states that will be used in the app.
 * 5. It uses the useEffect hook to run the isPedometerSupported function when the component mounts.
 * 6. It uses the useEffect hook to call the startStepCounter function when the component mounts.
 * 7. It returns the JSX code for the app.
 */

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

  // const [steps, setSteps] = useState(3247);
  // const [goal] = useState(10000);

  const [loaded, setLoaded] = React.useState(false);
  const [supported, setSupported] = React.useState(false);
  const [granted, setGranted] = React.useState(false);
  const [sensorType, setSensorType] = React.useState<SensorName>("NONE");
  const [stepCount, setStepCount] = React.useState(0);
  const [additionalInfo, setAdditionalInfo] = React.useState<AdditionalInfo>(initState);

  /**
   * Get user's motion permission and check pedometer is available.
   * This function checks if the step counting is supported by the device
   * and if the user has granted the app the permission to use it.
   * It sets the state variables 'granted' and 'supported' accordingly.
   */
  const isPedometerSupported = () => {
    isStepCountingSupported().then((result) => {
      setGranted(result.granted === true);
      setSupported(result.supported === true);
    });
  };

  /**
   * It starts the step counter and sets the sensor type, step count, and additional info.
   * The function startStepCounter is called when the user clicks the "Start" button.
   * It starts the step counter.
   */
  const startStepCounter = async () => {
    const today = new Date().toISOString().split("T")[0];
    const savedData = await getFitInfosDataForToday(today);
    const previousSteps = savedData.steps ?? 0;

    startStepCounterUpdate(new Date(), (data) => {
      setSensorType(data.counterType as SensorName);
      const parsedData = parseStepData(data);

      const difference = parsedData.steps - previousSteps;
      const updatedSteps = previousSteps + (difference > 0 ? difference : 0);

      setStepCount(updatedSteps);

      setAdditionalInfo({
        stepsString: `${updatedSteps} steps`,
        calories: parsedData.calories,
        distance: parsedData.distance,
      });
    });

    setLoaded(true);
  };

  /**
   * It sets the state of the additionalInfo object to its initial state, stops the step counter update,
   * and sets the loaded state to false.
   * This function is used to stop the step counter.
   */
  const stopStepCounter = () => {
    setAdditionalInfo(initState);
    stopStepCounterUpdate();
    setLoaded(false);
  };

  /**
   * If the sensor is working, stop it. If it's not working,
   * Get permission for the other sensor and start it.
   * This function is used to force the use of another sensor.
   */
  const forceUseAnotherSensor = () => {
    if (isSensorWorking) {
      stopStepCounter();
    } else {
      if (sensorType === "Step Counter") {
        getBodySensorPermission().then(setGranted);
      } else {
        getStepCounterPermission().then(setGranted);
      }
    }
    startStepCounter();
  };

  /**
   * A hook that runs when the component mounts. It calls the isPedometerSupported function
   * and returns a function that stops the step counter.
   * This effect runs when the component is first mounted
   * and then runs again when the `count` variable changes.
   */
  React.useEffect(() => {
    const loadStepsFromDB = async () => {
      isPedometerSupported(); // verifica suporte ao sensor

      const today = new Date().toISOString().split("T")[0];
      const data = await getFitInfosDataForToday(today); // lê do SQLite

      setStepCount(data.steps);
      setAdditionalInfo({
        stepsString: `${data.steps} steps`,
        calories: `${data.kcal} kCal`,
        distance: `${data.distance} m`,
      });
    };

    loadStepsFromDB();

    return () => {
      stopStepCounter();
    };
  }, []);

  /**
   * A hook that runs when the component mounts.
   * It calls the isPedometerSupported function and returns a
   * function that stops the step counter.
   */
  React.useEffect(() => {
    console.debug(`🚀 stepCounter ${supported ? "" : "not"} supported`);
    console.debug(`🚀 user ${granted ? "granted" : "denied"} stepCounter`);
    startStepCounter();
  }, [granted, supported]);

  const parseValidFitInfo = (value: string | undefined): number => {
    if (!value) return 0;
    // Extrai números antes de qualquer letra (kCal, m, etc)
    const match = value.match(/^([\d.]+)/);
    return match ? Number(match[1]) : 0;
  };

  const fitInfo = {
    steps: stepCount,
    kcal: parseValidFitInfo(additionalInfo.calories),
    distance: parseValidFitInfo(additionalInfo.distance),
  };

  console.log(fitInfo);

  useStepSync(fitInfo);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30, flexGrow: 1 }}>
      <Header />
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <StepCounter steps={stepCount} goal={1050} size={250} strokeWidth={15} />
      </View>
      <View>
        <Text>{additionalInfo.calories}</Text> 
        <Text>{additionalInfo.distance}</Text>
      </View>

      <View style={{ marginTop: 35, marginBottom: 25 }}>
        <Tabs tabs={TABS} initialTabKey="habit" onTabChange={(key: string) => setCurrentTab(key)} />
      </View>

      {habitFitIsLoading && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={50} />
        </View>
      )}

      {currentTab === "habit" ? (
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
      ) : (
        <View style={styles.habitTodoContainer}>
          <Text style={{ color: "black" }}>Tarefas</Text>
        </View>
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
});
