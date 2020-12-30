import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScoreLine } from '../types';

export const addLocalScores = async (value: ScoreLine): Promise<void> => {
  try {
    const scoresJSON = await getLocalScores();
    scoresJSON.push(value);
    const scoresString = JSON.stringify(scoresJSON);
    await AsyncStorage.setItem('@local_scores', scoresString);
  } catch (e) {
    console.error(e);
  }
};

export const getLocalScores = async (): Promise<ScoreLine[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@local_scores');
    if (jsonValue) {
      return JSON.parse(jsonValue).sort(
        (a: ScoreLine, b: ScoreLine) => a.time - b.time
      );
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const deleteLocalScores = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem('@local_scores');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getStoredName = async (): Promise<string> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@username');
    if (jsonValue) {
      return JSON.parse(jsonValue);
    } else {
      return 'Player Name';
    }
  } catch (e) {
    console.error(e);
    return 'Player Name';
  }
};

export const setStoredName = (username: string) => {
  try {
    AsyncStorage.setItem('@username', JSON.stringify(username));
  } catch (e) {
    console.error(e);
  }
};

export const toggleVibrationsTo = (toggle: boolean) => {
  try {
    AsyncStorage.setItem('@options_vibrations', toggle.toString());
  } catch (e) {
    console.error(e);
  }
};

export const getVibrations = async (): Promise<boolean> => {
  try {
    const ans = await AsyncStorage.getItem('@options_vibrations');
    return ans === 'true';
  } catch (e) {
    console.error(e);
  }
  return true;
};
