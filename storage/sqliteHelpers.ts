import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';

export interface FitData {
  steps: number;
  kcal: number;
  distance: number;
  sensorStepsRaw?: number;
}''

export const initDB = async(db: SQLiteDatabase) => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS StepCount (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT UNIQUE,
      steps INTEGER,
      kcal REAL,
      distance REAL,
      sensorStepsRaw INTEGER DEFAULT 0
    );
  `).catch(console.error);
};

export const insertOrUpdateFitInfos = async (
  date: string,
  data: FitData,
  db: SQLiteDatabase
): Promise<void> => {
  const { steps, kcal, distance, sensorStepsRaw = 0} = data;
  try {
    await db.runAsync(
      `INSERT INTO StepCount (date, steps, kcal, distance, sensorStepsRaw)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(date)
       DO UPDATE SET steps = ?, kcal = ?, distance = ?, sensorStepsRaw = ?;`,
      [date, steps, kcal, distance, sensorStepsRaw, steps, kcal, distance, sensorStepsRaw]
    );
  } catch (error) {
    console.error("Erro ao salvar informações de exercício:", error);
    throw error;
  }
};

export const getFitInfosDataForToday = async (
  date: string,
  db: SQLiteDatabase
): Promise<FitData> => {
  try {
    const result = await db.getFirstAsync<FitData>(
      `SELECT steps, kcal, distance, sensorStepsRaw FROM StepCount WHERE date = ?;`,
      [date]
    );
    return result ?? { steps: 0, kcal: 0, distance: 0, sensorStepsRaw: 0 };
  } catch (error) {
    console.error("Erro ao buscar passos:", error);
    return { steps: 0, kcal: 0, distance: 0, sensorStepsRaw: 0 };
  }
};