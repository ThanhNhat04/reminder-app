import React, { useState } from 'react';
// Import các component cần thiết
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
// Import icon từ thư viện Ionicons
import Ionicons from '@expo/vector-icons/Ionicons';
// Import danh sách reminders
import ReminderGrid from '../components/ReminderGrid';
// Import modal để thêm nhắc nhở mới
import AddReminderModal from '../components/AddReminderModal';
// Import loading spinner
import Spinner from '../components/Spinner';
// Import custom hook để quản lý reminders
import { useReminders } from '../hooks/useReminders';

// Component màn hình hiển thị tất cả nhắc nhở
export default function AllRemindersScreen() {
  // Lấy các giá trị và hàm thao tác từ hook
  const { reminders, loading, addReminder, toggleStatus, updateReminder, deleteReminder } = useReminders();
  // State điều khiển việc mở modal thêm mới
  const [modalVisible, setModalVisible] = useState(false);

  // Nếu đang loading thì hiển thị spinner
  if (loading) return <Spinner />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header có tiêu đề và nút thêm mới */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reminders</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)} // mở modal khi bấm +
          style={styles.addButton}
        >
          <Ionicons name="add" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Hiển thị danh sách reminders */}
      <ReminderGrid
        data={reminders}
        onToggleStatus={toggleStatus} // bấm vào đổi trạng thái hoàn thành
        onDelete={deleteReminder}     // bấm vào xóa nhắc nhở
        onUpdate={updateReminder}     // chỉnh sửa nhắc nhở
      />

      {/* Modal thêm nhắc nhở mới */}
      <AddReminderModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // đóng modal
        onAdd={({ title, date, time, note }) => {
          // Thêm reminder mới rồi đóng modal
          addReminder({ title, date, time, note });
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

// Các style cho AllRemindersScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // nền trắng
  },
  header: {
    backgroundColor: '#ccc', // nền xám nhạt
    flexDirection: 'row', // header nằm ngang
    alignItems: 'center',
    justifyContent: 'space-between', // tiêu đề bên trái, nút + bên phải
    paddingTop: 35, // chừa khoảng an toàn phía trên
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    padding: 4, // thêm vùng bấm cho nút +
  },
});
