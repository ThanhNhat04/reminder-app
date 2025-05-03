import * as Notifications from 'expo-notifications';
/**
Lên lịch một notification vibration & sound trên Android.
*/
export async function scheduleNotification(
  id: string,
  title: string,
  dateTime: Date
) {
  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title: 'Nhắc nhở',
      body: title,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      vibrate: [0, 500, 200, 500],
    },
    trigger: {
      type: 'date',
      date: dateTime,
      repeats: false,
    },
  });
}

/** Huỷ notification đã lên lịch theo id */
export async function cancelNotification(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}







// import * as Notifications from 'expo-notifications';
// /**
//  * Lên lịch một notification đơn giản với vibration & sound trên Android.
//  */
// export async function scheduleNotification(
//   id: string,
//   title: string,
//   dateTime: Date
// ) {
//   await Notifications.scheduleNotificationAsync({
//     identifier: id,
//     content: {
//       title: 'Nhắc nhở',
//       body: title,
//       sound: true,
//       priority: Notifications.AndroidNotificationPriority.HIGH,
//       vibrate: [0, 500, 200, 500],
//     },
//     trigger: {
//       type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//       seconds: 60 * 20,
//       repeats: false,
//     },
//     // trigger: null,
//   });
// }

// /** Huỷ notification đã lên lịch theo id */
// export async function cancelNotification(id: string) {
//   await Notifications.cancelScheduledNotificationAsync(id);
// }
