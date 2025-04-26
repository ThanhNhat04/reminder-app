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
  visible: boolean; // xác định modal có đang hiển thị hay không
  onClose: () => void; // hàm gọi khi đóng modal
  onAdd: (data: {   // hàm gọi khi lưu nhắc nhở mới
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
  // state cho tiêu đề nhắc
  const [title, setTitle] = useState<string>('');
  // state cho ngày nhắc
  const [date, setDate] = useState<Date>(new Date());
  // state cho giờ nhắc
  const [time, setTime] = useState<Date>(new Date());
  // state cho ghi chú tùy chọn
  const [note, setNote] = useState<string>('');

  // hàm xóa dữ liệu trong form về mặc định
  const clearForm = () => {
    setTitle('');
    setDate(new Date());
    setTime(new Date());
    setNote('');
  };

  // xử lý khi nhấn hủy: xóa form và đóng modal
  const handleCancel = () => {
    clearForm();
    onClose();
  };

  // xử lý khi nhấn lưu: gọi onAdd với dữ liệu, rồi xóa form và đóng modal
  const handleSave = () => {
    onAdd({ title, date, time, note });
    clearForm();
    onClose();
  };

  // vô hiệu nút Lưu nếu tiêu đề đang trống
  const isSaveDisabled = title.trim().length === 0;

  return (
    // Modal React Native với hiệu ứng trượt và nền trong suốt
    <Modal visible={visible} transparent animationType="slide">
      {/* bắt sự kiện chạm ra ngoài để đóng modal */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* tránh bàn phím che khuất form*/}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardContainer}
          >
            {/* chặn sự kiện chạm xuống view bên trong không đóng modal */}
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* nhãn cho input tiêu đề */}
                  <Text style={styles.label}>Tiêu đề</Text>
                  {/* input có gợi ý hoàn thành tự động */}
                  <AutoCompleteInput
                    value={title}
                    onChange={setTitle}
                  />
                  <Text style={styles.label}>Ngày &amp; Giờ nhắc</Text>

                  {/* component chọn ngày giờ */}
                  <DateTimePickerModal
                    date={date}
                    time={time}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                  />

                  {/*Ô nhập ghi chú */}
                  <Text style={styles.label}>Ghi chú (tùy chọn)</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Viết gì đó..."
                    value={note}
                    onChangeText={setNote}
                    multiline
                  />
                </ScrollView>
                {/* hai nút Hủy và Lưu */}
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
