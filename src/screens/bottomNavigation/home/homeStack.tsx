import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './home';
import {Chat} from './chat';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};
