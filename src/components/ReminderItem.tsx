// src/components/ReminderItem.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Reminder } from '../hooks/useReminders';
import Ionicons from '@expo/vector-icons/Ionicons';
import EditReminderForm from './EditReminderForm';

interface Props {
  item: Reminder;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: { title: string; date: Date; time: Date; note: string }
  ) => void;
}

export default function ReminderItem({
  item,
  onToggleStatus,
  onDelete,
  onUpdate,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const formattedDate = new Date(item.date).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={styles.card}
      >
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={() => onToggleStatus(item.id)}>
            <Ionicons
              name={item.status ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.status ? '#28a745' : '#888'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.date}>{formattedDate}</Text>
        {item.note?.length > 0 && (
          <Text style={styles.note} numberOfLines={1}>
            {item.note}
          </Text>
        )}
      </TouchableOpacity>

      <EditReminderForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        reminder={item}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  note: {
    marginTop: 8,
    fontSize: 12,
    color: '#444',
  },
});
