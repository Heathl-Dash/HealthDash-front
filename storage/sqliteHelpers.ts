import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('fit.db');

export interface FitData {
  steps: number;
  kcal: number;
  distance: number;
}''

export const initDB = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS StepCount (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT UNIQUE,
      steps INTEGER,
      kcal REAL,
      distance REAL
    );
  `).catch(console.error);
};

export const insertOrUpdateFitInfos = async (
  date: string,
  data: FitData
): Promise<void> => {
  const { steps, kcal, distance } = data;
  try {
    await db.runAsync(
      `INSERT INTO StepCount (date, steps, kcal, distance)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(date)
       DO UPDATE SET steps = ?, kcal = ?, distance = ?;`,
      [date, steps, kcal, distance, steps, kcal, distance]
    );
  } catch (error) {
    console.error("Erro ao salvar informações de exercício:", error);
    throw error;
  }
};

export const getFitInfosDataForToday = async (
  date: string
): Promise<FitData> => {
  try {
    const result = await db.getFirstAsync<FitData>(
      `SELECT steps, kcal, distance FROM StepCount WHERE date = ?;`,
      [date]
    );
    return result ?? { steps: 0, kcal: 0, distance: 0 };
  } catch (error) {
    console.error("Erro ao buscar passos:", error);
    return { steps: 0, kcal: 0, distance: 0 };
  }
};