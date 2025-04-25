import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

interface Props {
  date: Date
  time: Date
  onDateChange: (d: Date) => void
  onTimeChange: (t: Date) => void
}

export default function DateTimePickerModal({
  date,
  time,
  onDateChange,
  onTimeChange,
}: Props) {
  const openAndroidPicker = (
    mode: 'date' | 'time',
    value: Date,
    callback: (d: Date) => void
  ) => {
    DateTimePickerAndroid.open({
      value,
      mode,
      is24Hour: true,
      onChange: (_event, selected) => {
        if (_event.type === 'set' && selected) {
          const now = new Date()

          if (mode === 'date') {
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            if (selected < todayStart) {
              Alert.alert('Lỗi', 'Vui lòng chọn ngày từ hôm nay trở đi.')
              return
            }
          } else {
            const selDateTime = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              selected.getHours(),
              selected.getMinutes()
            )
            if (
              date.getFullYear() === now.getFullYear() &&
              date.getMonth() === now.getMonth() &&
              date.getDate() === now.getDate() &&
              selDateTime < now
            ) {
              Alert.alert('Lỗi', 'Vui lòng chọn thời gian từ hiện tại trở đi.')
              return
            }
          }

          callback(selected)
        }
      },
    })
  }

  return (
    <View>
      {/* Set Date */}
      <TouchableOpacity
        style={styles.field}
        onPress={() => openAndroidPicker('date', date, onDateChange)}
      >
        <Text style={styles.text}>{date.toLocaleDateString()}</Text>
        <Ionicons name="calendar-outline" size={20} color="#666" />
      </TouchableOpacity>

      {/* Set Time */}
      <TouchableOpacity
        style={[styles.field, { marginTop: 12 }]}
        onPress={() => openAndroidPicker('time', time, onTimeChange)}
      >
        <Text style={styles.text}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Ionicons name="time-outline" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    // shadow nhẹ
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})


