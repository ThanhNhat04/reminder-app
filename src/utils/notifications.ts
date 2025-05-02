// src/utils/notifications.ts
import PushNotification from 'react-native-push-notification';

export function scheduleNotification(
  id: string,
  title: string,
  dateTime: Date
) {
  PushNotification.localNotificationSchedule({
    // Android-only:
    channelId: 'reminders',
    // Unique id để hủy sau này
    id,
    title: 'Nhắc nhở',  // tiêu đề notification
    message: title,     // nội dung notification
    date: dateTime,     // thời gian thông báo
    allowWhileIdle: true,
  });
}

export function cancelNotification(id: string) {
  PushNotification.cancelLocalNotifications({ id });
}
