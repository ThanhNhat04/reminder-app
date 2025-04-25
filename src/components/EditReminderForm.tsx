// src/components/EditReminderForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
  Alert,
} from 'react-native';
import DateTimePickerModal from './DateTimePickerModal';
import { Reminder } from '../hooks/useReminders';

interface Props {
  visible: boolean;
  onClose: () => void;
  reminder?: Reminder;
  onUpdate: (
    id: string,
    data: { title: string; date: Date; time: Date; note: string }
  ) => void;
  onDelete: (id: string) => void;
}

export default function EditReminderForm({
  visible,
  onClose,
  reminder,
  onUpdate,
  onDelete,
}: Props) {
  // State form
  const [title, setTitle] = useState(reminder?.title || '');
  const [date, setDate] = useState(reminder ? new Date(reminder.date) : new Date());
  const [time, setTime] = useState(reminder ? new Date(reminder.time) : new Date());
  const [note, setNote] = useState(reminder?.note || '');

  useEffect(() => {
    if (!reminder) return;
    setTitle(reminder.title);
    setDate(new Date(reminder.date));
    setTime(new Date(reminder.time));
    setNote(reminder.note || '');
  }, [reminder]);

  // Notification helper
  const notify = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert('Thông báo', msg);
    }
  };

  // Handlers
  const handleSave = () => {
    if (!reminder) return;
    onUpdate(reminder.id, { title, date, time, note });
    onClose();
    notify('Cập nhật thành công');
  };

  const handleDelete = () => {
    if (!reminder) return;
    onDelete(reminder.id);
    onClose();
    notify('Đã xóa nhắc nhở');
  };

  const isSaveDisabled = title.trim().length === 0;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboard}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.label}>Tiêu đề</Text>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Nhập tiêu đề"
                  />

                  <Text style={styles.label}>Ngày &amp; Giờ nhắc</Text>
                  <DateTimePickerModal
                    date={date}
                    time={time}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                  />

                  <Text style={styles.label}>Ghi chú</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={note}
                    onChangeText={setNote}
                    placeholder="Ghi chú (tùy chọn)"
                    multiline
                    numberOfLines={4}
                  />
                </ScrollView>

                <View style={styles.actions}>
                  <View style={styles.buttonWrapper}>
                    <Button title="Xóa" color="#d9534f" onPress={handleDelete} />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <Button
                      title="Cập nhật"
                      onPress={handleSave}
                      disabled={isSaveDisabled}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxHeight: '80%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 4,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
});
