import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllRemindersScreen from '../screens/AllRemindersScreen';
import TodayRemindersScreen from '../screens/TodayRemindersScreen';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'All'
              ? 'list'
              : 'calendar';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="All" component={AllRemindersScreen} options={{ title: 'Tất cả' }} />
      <Tab.Screen name="Today" component={TodayRemindersScreen} options={{ title: 'Hôm nay' }} />
    </Tab.Navigator>
  );
}