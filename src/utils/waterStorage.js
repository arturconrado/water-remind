import AsyncStorage from '@react-native-async-storage/async-storage';

const WATER_INTAKE_KEY = '@water_intake';
const LAST_RESET_DATE_KEY = '@last_reset_date';
const DAILY_GOAL = 2000; // ml

export const getTodayWaterIntake = async () => {
  try {
    const today = new Date().toDateString();
    const lastResetDate = await AsyncStorage.getItem(LAST_RESET_DATE_KEY);
    
    if (lastResetDate !== today) {
      await AsyncStorage.setItem(WATER_INTAKE_KEY, '0');
      await AsyncStorage.setItem(LAST_RESET_DATE_KEY, today);
      return 0;
    }
    
    const intake = await AsyncStorage.getItem(WATER_INTAKE_KEY);
    return intake ? parseInt(intake, 10) : 0;
  } catch (error) {
    console.error('Erro ao buscar ingestão de água:', error);
    return 0;
  }
};

export const addWaterIntake = async (amount) => {
  try {
    const currentIntake = await getTodayWaterIntake();
    const newIntake = currentIntake + amount;
    await AsyncStorage.setItem(WATER_INTAKE_KEY, newIntake.toString());
    return newIntake;
  } catch (error) {
    console.error('Erro ao adicionar ingestão de água:', error);
    return -1;
  }
};

export const getProgress = async () => {
  const intake = await getTodayWaterIntake();
  return Math.min(intake / DAILY_GOAL, 1);
};

export const setDailyGoal = async (goal) => {
  try {
    await AsyncStorage.setItem('@daily_goal', goal.toString());
    return true;
  } catch (error) {
    console.error('Erro ao definir meta diária:', error);
    return false;
  }
};

export const getDailyGoal = async () => {
  try {
    const goal = await AsyncStorage.getItem('@daily_goal');
    return goal ? parseInt(goal, 10) : DAILY_GOAL;
  } catch (error) {
    console.error('Erro ao buscar meta diária:', error);
    return DAILY_GOAL;
  }
};

export const resetWaterIntake = async () => {
  try {
    await AsyncStorage.setItem(WATER_INTAKE_KEY, '0');
    return true;
  } catch (error) {
    console.error('Erro ao resetar ingestão de água:', error);
    return false;
  }
};
