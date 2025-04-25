// src/components/ReminderGrid.tsx
import React from 'react';
import { FlatList } from 'react-native';
import ReminderItem from './ReminderItem';
import { Reminder } from '../hooks/useReminders';

interface Props {
  data: Reminder[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: { title: string; date: Date; time: Date; note: string }
  ) => void;
}

export default function ReminderGrid({
  data,
  onToggleStatus,
  onDelete,
  onUpdate,
}: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ReminderItem
          item={item}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
      numColumns={2}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
