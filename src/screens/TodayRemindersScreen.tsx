// src/screens/TodayRemindersScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReminderGrid from '../components/ReminderGrid';
import Spinner from '../components/Spinner';
import { useReminders } from '../hooks/useReminders';

const isToday = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

export default function TodayRemindersScreen() {
  const {
    reminders,
    loading,
    toggleStatus,
    deleteReminder,
    updateReminder,
  } = useReminders();

  const [filter, setFilter] = useState<'all' | 'done' | 'pending'>('all');

  const todayReminders = useMemo(
    () => reminders.filter(r => isToday(r.date)),
    [reminders]
  );

  const displayed = useMemo(() => {
    if (filter === 'done') return todayReminders.filter(r => r.status);
    if (filter === 'pending') return todayReminders.filter(r => !r.status);
    return todayReminders;
  }, [todayReminders, filter]);

  if (loading) return <Spinner />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nhắc hôm nay</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.filterTextActive,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'done' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('done')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'done' && styles.filterTextActive,
            ]}
          >
            Hoàn thành
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'pending' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('pending')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'pending' && styles.filterTextActive,
            ]}
          >
            Chưa hoàn thành
          </Text>
        </TouchableOpacity>
      </View>

      <ReminderGrid
        data={displayed}
        onToggleStatus={toggleStatus}
        onDelete={deleteReminder}
        onUpdate={updateReminder}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
