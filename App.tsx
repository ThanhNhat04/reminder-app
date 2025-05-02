import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation';

export default function App() {
  // useEffect(() => {
  //   // Tạo channel cho Android
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'reminders', // phải trùng với channelId đang dùng
  //       channelName: 'Nhắc Nhở', 
  //       importance: 4, // HIGH
  //     },
  //     (created) => console.log(`PushNotification channel created: ${created}`)
  //   );

  //   // Cấu hình chung
  //   PushNotification.configure({
  //     onNotification: function (notification) {
  //       console.log('NOTIFICATION:', notification);
  //     },
  //     // Chỉ request quyền iOS
  //     requestPermissions: Platform.OS === 'ios',
  //   });
  // }, []);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
