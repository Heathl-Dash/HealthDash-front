import { createFitData } from "@/lib/axios";
import NetInfo from "@react-native-community/netinfo";
import { useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { insertOrUpdateFitInfos } from "../storage/sqliteHelpers";

interface Props {
  steps: number;
  kcal: number;
  distance: number;
}

const useStepSync = ({ steps, kcal, distance }: Props) => {
  const appState = useRef(AppState.currentState);
  const [isConnected, setIsConnected] = useState(false);
  const db = useSQLiteContext();

  useEffect(() => {
    if (steps === 0 && kcal === 0 && distance === 0) return;

    const today = new Date().toLocaleDateString("sv-SE");
    const saveToSQLite = async () => {
      await insertOrUpdateFitInfos(today, { steps, kcal, distance }, db);
    };

    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState: AppStateStatus) => {
        if (appState.current.match(/active/) && nextAppState.match(/inactive|background/)) {
          await saveToSQLite();
        }
        appState.current = nextAppState;
      }
    );

    const netInfoUnsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!(state.isConnected && state.isInternetReachable));
    });

    const bootstrap = async () => {
      await saveToSQLite();
    };

    bootstrap();

    return () => {
      subscription.remove();
      netInfoUnsubscribe();
    };
  }, [steps, kcal, distance, isConnected, db]);

  const addFitDateMutation = useMutation({
    mutationFn: (data: IFitData) => createFitData(data),
  });

  useEffect(() => {
    const sendToBack = () => {
      const today = new Date().toLocaleDateString("sv-SE");
      const data: IFitData = {
        fit_date: today,
        steps,
        distance,
        burned_calories: kcal,
      };

      addFitDateMutation.mutate(data);
    };

    sendToBack();
  }, [isConnected]);
};

export default useStepSync;
