// import React, { useState } from 'react';
// import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

// interface Props { value: string; onChange: (text: string) => void; }
// const suggestions = ['Họp hành','Sinh nhật','Gọi điện thoại','Thanh toán hóa đơn'];

// export default function AutoCompleteInput({ value, onChange }: Props) {
//   const filtered = suggestions.filter(s => s.includes(value) && value.length);
//   return (
//     <View>
//       <TextInput style={styles.input} placeholder="Tiêu đề" value={value} onChangeText={onChange}/>
//       {filtered.length > 0 && (
//         <FlatList data={filtered} keyExtractor={item => item} renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => onChange(item)}>
//             <Text style={styles.suggestion}>{item}</Text>
//           </TouchableOpacity>
//         )}/>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 },
//   suggestion: { padding: 8, backgroundColor: '#f2f2f2' }
// });


// src/components/AutoCompleteInput.tsx
import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useReminders } from '../hooks/useReminders'

interface Props {
  value: string
  onChange: (text: string) => void
}

export default function AutoCompleteInput({ value, onChange }: Props) {
  const { reminders } = useReminders()

  // Lấy danh sách tiêu đề
  const suggestions = Array.from(
    new Set(reminders.map(r => r.title).filter(t => t.trim().length > 0))
  )
  const filtered = suggestions.filter(title =>
    title.toLowerCase().includes(value.toLowerCase()) && value.length > 0
  )

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề"
        value={value}
        onChangeText={onChange}
      />
      {filtered.length > 0 && (
        <View style={styles.suggestionContainer}>
          {/* {filtered.map(title => (
            <TouchableOpacity
              key={title}
              onPress={() => onChange(title)}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>{title}</Text>
            </TouchableOpacity>
          ))} */}
          <ScrollView
            style={styles.scroll}
            nestedScrollEnabled={true}
          >
            {filtered.map(title => (
              <TouchableOpacity
                key={title}
                onPress={() => onChange(title)}
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

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 4,
  },
  suggestionContainer: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderRadius: 4,
    marginTop: -1,
    maxHeight: 100,
  },
  scroll: {
    flexGrow: 0,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
})
