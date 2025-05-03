import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

//Cấu hình Notification cho Android
export default function App() {
  useEffect(() => {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Nhắc Nhở',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 500, 200, 500],
      sound: 'default',
    });
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}








// import React, { useEffect } from 'react';
// import { Platform } from 'react-native';
// import PushNotification from 'react-native-push-notification';
// import { NavigationContainer } from '@react-navigation/native';
// import TabNavigator from './src/navigation';

// export default function App() {
//   useEffect(() => {
//     // Tạo channel cho Android
//     PushNotification.createChannel(
//       {
//         channelId: 'reminders', // phải trùng với channelId đang dùng
//         channelName: 'Nhắc Nhở', 
//         importance: 4, // HIGH
//       },
//       (created) => console.log(`PushNotification channel created: ${created}`)
//     );

//     // Cấu hình chung
//     PushNotification.configure({
//       onNotification: function (notification) {
//         console.log('NOTIFICATION:', notification);
//       },
//       // Chỉ request quyền iOS
//       requestPermissions: Platform.OS === 'ios',
//     });
//   }, []);

//   return (
//     <NavigationContainer>
//       <TabNavigator />
//     </NavigationContainer>
//   );
// }


// import React, { useEffect, useRef } from 'react';
// import { Platform } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import { NavigationContainer } from '@react-navigation/native';
// import TabNavigator from './src/navigation';

// // Khi app foreground: vẫn hiển thị banner + âm thanh
// // Notifications.setNotificationHandler({
// //   handleNotification: async () => ({
// //     shouldShowAlert: true,
// //     shouldPlaySound: true,
// //   }),
// // });
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const responseListener = useRef<any>();

//   useEffect(() => {
//     ;(async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status !== 'granted') {
//         console.warn('Notification permission not granted!');
//       }
//     })();

//     // Lắng nghe khi user tap vào notification
//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener(response => {
//         console.log('User tapped notification:', response);
//       });

//     return () => {
//       if (responseListener.current) {
//         Notifications.removeNotificationSubscription(responseListener.current);
//       }
//     };
//   }, []);

//   return (
//     <NavigationContainer>
//       <TabNavigator />
//     </NavigationContainer>
//   );
// }


// // App.tsx
// import React, { useEffect, useRef } from 'react';
// import { Platform } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import { NavigationContainer } from '@react-navigation/native';
// import TabNavigator from './src/navigation';


// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const responseListener = useRef<any>();

//   useEffect(() => {
//     // Tạo kênh notification (chỉ Android)
//     if (Platform.OS === 'android') {
//       Notifications.setNotificationChannelAsync('reminders', {
//         name: 'Nhắc Nhở',
//         importance: Notifications.AndroidImportance.HIGH,
//         vibrationPattern: [0, 500, 200, 500], // rung 500ms, nghỉ 200ms, rung 500ms
//         lightColor: '#FF231F7C',
//         sound: 'default', 
//       });
//     }

//     // Yêu cầu quyền (iOS)
//     (async () => {
//       const { status } = await Notifications.requestPermissionsAsync({
//         ios: { allowAlert: true, allowSound: true, allowBadge: true },
//       });
//       if (status !== 'granted') {
//         console.warn('Notification permission not granted!');
//       }
//     })();

//     // Lắng nghe khi user tap notification
//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener(response => {
//         console.log('User tapped notification:', response);
//       });

//     return () => {
//       if (responseListener.current) {
//         Notifications.removeNotificationSubscription(responseListener.current);
//       }
//     };
//   }, []);

//   return (
//     <NavigationContainer>
//       <TabNavigator />
//     </NavigationContainer>
//   );
// }
