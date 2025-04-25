import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReminderGrid from '../components/ReminderGrid';
import AddReminderModal from '../components/AddReminderModal';
import Spinner from '../components/Spinner';
import { useReminders } from '../hooks/useReminders';

export default function AllRemindersScreen() {
  const { reminders, loading, addReminder, toggleStatus , updateReminder, deleteReminder} = useReminders();
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) return <Spinner />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reminders</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Ionicons name="add" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Reminder list */}
      <ReminderGrid
        data={reminders}
        onToggleStatus={toggleStatus}
        onDelete={deleteReminder}
        onUpdate={updateReminder}
      />

      {/* Modal */}
      <AddReminderModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={({ title, date, time, note }) => {
          addReminder({ title, date, time, note });
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:35,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    padding: 4,
  },
});
