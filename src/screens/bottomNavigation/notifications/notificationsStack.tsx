import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Notification} from './notifications';

const Stack = createNativeStackNavigator();

export const NotificationsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="notifications" component={Notification} />
    </Stack.Navigator>
  );
};
