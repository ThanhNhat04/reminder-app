import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reminder } from '../hooks/useReminders';

const STORAGE_KEY = '@reminders';

export const saveReminders = async (reminders: Reminder[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
};

export const loadReminders = async (): Promise<Reminder[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};