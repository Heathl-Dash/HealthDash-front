import { AppState, AppStateStatus } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {FitData, getFitInfosDataForToday, insertOrUpdateFitInfos} from '../storage/sqliteHelpers';

interface Props {
  steps: number;
  kcal: number;
  distance: number;
}

const useStepSync = ({ steps, kcal, distance }: Props) => {
  const appState = useRef(AppState.currentState);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

    const saveToSQLite = async () => {
      await insertOrUpdateFitInfos(today, { steps, kcal, distance });
    };

    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/active/) &&
          nextAppState.match(/inactive|background/)
        ) {
          await saveToSQLite();
        }
        appState.current = nextAppState;
      }
    );

    const netInfoUnsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!(state.isConnected && state.isInternetReachable));
    });

    const bootstrap = async () => {
      await saveToSQLite();
    };

    bootstrap();

    return () => {
      subscription.remove();
      netInfoUnsubscribe();
    }


  }, [steps, kcal, distance, isConnected])

    
}

export default useStepSync