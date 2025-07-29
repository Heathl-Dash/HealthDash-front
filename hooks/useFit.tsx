import {
  isStepCountingSupported,
  parseStepData,
  startStepCounterUpdate,
  stopStepCounterUpdate,
  type ParsedStepCountData,
} from "@dongminyu/react-native-step-counter";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { requestStepPermissions } from "@/hooks/permission";
import { Platform } from "react-native";
import useStepSync from "./useStepSync";
import { getFitInfosDataForToday } from "@/storage/sqliteHelpers";

type SensorType<T = typeof Platform.OS> = T extends "ios"
  ? "CMPedometer"
  : T extends "android"
    ? "Step Counter" | "Accelerometer"
    : "NONE";

type SensorName = SensorType<Platform["OS"]>;

const initState = {
  stepsString: "0 steps",
  calories: "0 kCal",
  distance: "0.0 m",
};

type AdditionalInfo = Partial<ParsedStepCountData>;

const useFit = () => {
  const [supported, setSupported] = React.useState(false);
  const [granted, setGranted] = React.useState(false);
  const [sensorType, setSensorType] = React.useState<SensorName>("NONE");
  const [stepsFromDB, setStepsFromDB] = useState(0);
  const [stepsFromSensor, setStepsFromSensor] = useState(0);
  const [distanceFromDB, setDistanceFromDB] = useState(0);
  const [kcalFromDB, setKcalFromDB] = useState(0);

  const initialSensorValue = useRef<number | null>(null);
  const [additionalInfo, setAdditionalInfo] = React.useState<AdditionalInfo>(initState);

  const db = useSQLiteContext();

  const parseValidFitInfo = (value: string | undefined): number => {
    if (!value) return 0;
    const match = value.match(/^([\d.]+)/);
    return match ? Number(match[1]) : 0;
  };

  const isPedometerSupported = () => {
    isStepCountingSupported().then((result) => {
      setGranted(result.granted === true);
      setSupported(result.supported === true);
    });
  };

  const stopStepCounter = () => {
    setAdditionalInfo(initState);
    stopStepCounterUpdate();
  };

  useEffect(() => {
    const loadStepsFromDB = async () => {
      const today = new Date().toISOString().split("T")[0];
      const data = await getFitInfosDataForToday(today, db);

      setStepsFromDB(data.steps);
      setDistanceFromDB(data.distance);
      setKcalFromDB(data.kcal);
    };
    loadStepsFromDB();
  }, [db]);

  useEffect(() => {
  const checkPermissionAndStart = async () => {
    const granted = await requestStepPermissions();
    setGranted(granted);
    isPedometerSupported();

    if (!granted) {
      console.warn("Permissão de passos não concedida");
      return;
    }

    const startStepCounter = () => {
      startStepCounterUpdate(new Date(), (data) => {
        if (initialSensorValue.current === null) {
          initialSensorValue.current = data.steps;
          return;
        }
        const delta = data.steps - initialSensorValue.current;
        if (delta >= 0) {
          setStepsFromSensor(delta);
        }

        const parsedData = parseStepData(data);

        setSensorType(data.counterType as SensorName);
        setAdditionalInfo({ ...parsedData });
      });
    };

    startStepCounter();
  };

  checkPermissionAndStart();

  return () => {
    stopStepCounter();
  };
}, []);

  const totalSteps = stepsFromDB + stepsFromSensor;
  const totalDistance = distanceFromDB + parseValidFitInfo(additionalInfo.distance);
  const totalCalories = kcalFromDB + parseValidFitInfo(additionalInfo.calories);

  const fitInfo = useMemo(() => {
    return {
      steps: totalSteps,
      kcal: totalCalories,
      distance: totalDistance,
    };
  }, [additionalInfo.calories, additionalInfo.distance, totalSteps]);

  useStepSync(fitInfo);
  return {totalSteps, totalCalories, totalDistance}
  
}

export default useFit