// src/hooks/useReminders.ts
import { useEffect, useState } from 'react';
import { loadReminders, saveReminders } from '../utils/storage';

export interface Reminder {
  id: string;
  title: string;
  date: string; // ISO string
  time: string; // ISO string
  note: string;
  status: boolean;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await loadReminders();
      const normalized = data.map(r => ({
        ...r,
        note: r.note ?? '',
        status: typeof r.status === 'boolean' ? r.status : false,
      }));
      setReminders(normalized);
      setLoading(false);
    })();
  }, []);

  const persist = async (items: Reminder[]) => {
    setReminders(items);
    await saveReminders(items);
  };

  const addReminder = async (item: {
    title: string;
    date: Date;
    time: Date;
    note: string;
  }) => {
    const newItem: Reminder = {
      id: Date.now().toString(),
      title: item.title,
      date: item.date.toISOString(),
      time: item.time.toISOString(),
      note: item.note,
      status: false,
    };
    await persist([newItem, ...reminders]);
  };

  const toggleStatus = async (id: string) => {
    const updated = reminders.map(r =>
      r.id === id ? { ...r, status: !r.status } : r
    );
    await persist(updated);
  };

  const deleteReminder = async (id: string) => {
    const filtered = reminders.filter(r => r.id !== id);
    await persist(filtered);
  };

  const updateReminder = async (
    id: string,
    data: { title: string; date: Date; time: Date; note: string }
  ) => {
    const updated = reminders.map(r =>
      r.id === id
        ? {
            ...r,
            title: data.title,
            date: data.date.toISOString(),
            time: data.time.toISOString(),
            note: data.note,
          }
        : r
    );
    await persist(updated);
  };

  return {
    reminders,
    loading,
    addReminder,
    toggleStatus,
    deleteReminder,
    updateReminder,
  };
}
