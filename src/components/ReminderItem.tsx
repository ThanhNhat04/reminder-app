// src/components/ReminderItem.tsx
import React, { useState } from 'react';
// Import các component React Native cần thiết
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// Import kiểu Reminder
import { Reminder } from '../hooks/useReminders';
// Import icon từ thư viện Ionicons
import Ionicons from '@expo/vector-icons/Ionicons';
// Import form chỉnh sửa nhắc nhở
import EditReminderForm from './EditReminderForm';

// Khai báo Props cho ReminderItem
interface Props {
  item: Reminder; // đối tượng nhắc nhở
  onToggleStatus: (id: string) => void; // hàm đổi trạng thái hoàn thành
  onDelete: (id: string) => void; // hàm xóa nhắc nhở
  onUpdate: ( // hàm cập nhật thông tin nhắc nhở
    id: string,
    data: { title: string; date: Date; time: Date; note: string }
  ) => void;
}

// Component ReminderItem
export default function ReminderItem({
  item,
  onToggleStatus,
  onDelete,
  onUpdate,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false); // trạng thái mở modal chỉnh sửa

  // Định dạng ngày giờ để hiển thị
  const formattedDate = new Date(item.date).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <>
      {/* Thẻ nhắc nhở, bấm vào để mở form chỉnh sửa */}
      <TouchableOpacity
        activeOpacity={0.8} // hiệu ứng nhấn
        onPress={() => setModalVisible(true)} // mở modal chỉnh sửa
        style={styles.card}
      >
        {/* Phần tiêu đề + nút đổi trạng thái */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={() => onToggleStatus(item.id)}>
            {/* Icon trạng thái (đã hoàn thành hoặc chưa) */}
            <Ionicons
              name={item.status ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.status ? '#28a745' : '#888'}
            />
          </TouchableOpacity>
        </View>

        {/* Ngày giờ nhắc nhở */}
        <Text style={styles.date}>{formattedDate}</Text>

        {/* Ghi chú nếu có */}
        {item.note?.length > 0 && (
          <Text style={styles.note} numberOfLines={1}>
            {item.note}
          </Text>
        )}
      </TouchableOpacity>

      {/* Modal chỉnh sửa nhắc nhở */}
      <EditReminderForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // đóng modal
        reminder={item}
        onDelete={onDelete} // truyền hàm xóa
        onUpdate={onUpdate} // truyền hàm cập nhật
      />
    </>
  );
}

// Các style cho ReminderItem
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000', // đổ bóng
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // đổ bóng Android
  },
  header: {
    flexDirection: 'row', // layout hàng ngang
    alignItems: 'center',
    justifyContent: 'space-between', // căn 2 đầu
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8, // khoảng cách với icon
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#666', // màu ghi nhạt
  },
  note: {
    marginTop: 8,
    fontSize: 12,
    color: '#444', // màu ghi đậm hơn
  },
});
