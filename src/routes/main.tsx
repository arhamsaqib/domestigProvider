import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {OnboardingRoutes} from '../screens/onboarding/obStack';

const Stack = createNativeStackNavigator();

export const MainRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="omboarding" component={OnboardingRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};