import React from 'react'
// Import các component React Native cần thiết
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
// Import custom hook lấy danh sách reminders
import { useReminders } from '../hooks/useReminders'

// Kiểu Props cho component
interface Props {
  value: string // giá trị hiện tại trong ô nhập
  onChange: (text: string) => void // hàm callback khi thay đổi text
}

// Component AutoCompleteInput
export default function AutoCompleteInput({ value, onChange }: Props) {
  const { reminders } = useReminders() // lấy reminders từ custom hook

  // Tạo danh sách gợi ý:
  // - lấy title từ reminders
  // - loại bỏ trống
  // - loại trùng
  const suggestions = Array.from(
    new Set(reminders.map(r => r.title).filter(t => t.trim().length > 0))
  )

  // Lọc danh sách gợi ý dựa trên text người dùng nhập
  const filtered = suggestions.filter(title =>
    title.toLowerCase().includes(value.toLowerCase()) && value.length > 0
  )

  return (
    <View>
      {/* Ô nhập tiêu đề */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề"
        value={value}
        onChangeText={onChange}
      />
      
      {/* Nếu có gợi ý phù hợp, hiển thị danh sách gợi ý */}
      {filtered.length > 0 && (
        <View style={styles.suggestionContainer}>
          <ScrollView
            style={styles.scroll}
            nestedScrollEnabled={true} // cho phép scroll gợi ý
          >
            {filtered.map(title => (
              // Mỗi gợi ý là 1 nút có thể bấm
              <TouchableOpacity
                key={title}
                onPress={() => onChange(title)} // bấm gợi ý sẽ chọn text đó
                style={styles.suggestionItem}
              >
                <Text style={styles.suggestionText}>{title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

// Các style cho giao diện AutoCompleteInput
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc', // màu viền nhạt
    borderRadius: 4,
    padding: 10,
    marginTop: 4,
  },
  suggestionContainer: {
    backgroundColor: '#f9f9f9', // nền sáng cho gợi ý
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0, // bỏ viền trên để dính liền input
    borderRadius: 4,
    marginTop: -1, // đẩy gợi ý sát input
    maxHeight: 100, // giới hạn chiều cao tối đa
  },
  scroll: {
    flexGrow: 0, // không tự mở rộng ScrollView quá cần thiết
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // ngăn cách mỗi item
  },
  suggestionText: {
    fontSize: 14,
    color: '#333', // màu chữ gợi ý
  },
})
