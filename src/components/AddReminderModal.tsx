import React, { useState } from 'react';
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
} from 'react-native';
import DateTimePickerModal from './DateTimePickerModal';
import AutoCompleteInput from './AutoCompleteInput';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: {
    title: string;
    date: Date;
    time: Date;
    note: string;
  }) => void;
}

export default function AddReminderModal({
  visible,
  onClose,
  onAdd,
}: Props) {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [note, setNote] = useState<string>('');

  const clearForm = () => {
    setTitle('');
    setDate(new Date());
    setTime(new Date());
    setNote('');
  };

  const handleCancel = () => {
    clearForm();
    onClose();
  };

  const handleSave = () => {
    onAdd({ title, date, time, note });
    clearForm();
    onClose();
  };

  const isSaveDisabled = title.trim().length === 0;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardContainer}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.label}>Tiêu đề</Text>
                  <AutoCompleteInput
                    value={title}
                    onChange={setTitle}
                  />

                  <Text style={styles.label}>Ngày &amp; Giờ nhắc</Text>
                  <DateTimePickerModal
                    date={date}
                    time={time}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                  />

                  <Text style={styles.label}>Ghi chú (tùy chọn)</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Viết gì đó..."
                    value={note}
                    onChangeText={setNote}
                    multiline
                  />
                </ScrollView>

                <View style={styles.buttons}>
                  <View style={styles.buttonWrapper}>
                    <Button
                      title="Hủy"
                      onPress={handleCancel}
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <Button
                      title="Lưu"
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
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxHeight: '90%',
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
});
