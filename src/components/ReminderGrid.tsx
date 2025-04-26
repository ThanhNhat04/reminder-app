// // src/components/ReminderGrid.tsx
// import React from 'react';
// import { FlatList } from 'react-native';
// import ReminderItem from './ReminderItem';
// import { Reminder } from '../hooks/useReminders';

// interface Props {
//   data: Reminder[];
//   onToggleStatus: (id: string) => void;
//   onDelete: (id: string) => void;
//   onUpdate: (
//     id: string,
//     data: { title: string; date: Date; time: Date; note: string }
//   ) => void;
// }

// export default function ReminderGrid({
//   data,
//   onToggleStatus,
//   onDelete,
//   onUpdate,
// }: Props) {
//   return (
//     <FlatList
//       data={data}
//       keyExtractor={item => item.id}
//       renderItem={({ item }) => (
//         <ReminderItem
//           item={item}
//           onToggleStatus={onToggleStatus}
//           onDelete={onDelete}
//           onUpdate={onUpdate}
//         />
//       )}
//       numColumns={2}
//       contentContainerStyle={{ paddingBottom: 20 }}
//     />
//   );
// }

import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import ReminderItem from './ReminderItem';
import { Reminder } from '../hooks/useReminders';

// Khai báo Props cho component ReminderGrid
interface Props {
  data: Reminder[]; // danh sách các nhắc nhở
  onToggleStatus: (id: string) => void; // hàm đổi trạng thái hoàn thành/chưa
  onDelete: (id: string) => void; // hàm xóa nhắc nhở
  onUpdate: ( // hàm cập nhật thông tin nhắc nhở
    id: string,
    data: { title: string; date: Date; time: Date; note: string }
  ) => void;
  refreshing?: boolean; // trạng thái đang tải lại
  onRefresh?: () => void; // hàm gọi khi kéo để tải lại
}

// Component ReminderGrid
export default function ReminderGrid({
  data,
  onToggleStatus,
  onDelete,
  onUpdate,
  refreshing = false,
  onRefresh,
}: Props) {
  return (
    <FlatList
      data={data} // danh sách dữ liệu
      keyExtractor={item => item.id} // mỗi item cần key duy nhất
      renderItem={({ item }) => (
        // render từng nhắc nhở bằng ReminderItem
        <ReminderItem
          item={item}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
      numColumns={2} // chia lưới 2 cột
      contentContainerStyle={{ paddingBottom: 20 }} // thêm padding dưới cho đẹp
      refreshControl={
        // nếu có truyền vào onRefresh, thêm tính năng kéo để tải lại
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    />
  );
}
