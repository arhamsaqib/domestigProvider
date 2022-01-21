import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {OnboardingRoutes} from '../screens/onboarding/obStack';
import {AuthStack} from '../screens/auth/authStack';
import MainBottomNav from '../screens/bottomNavigation/navigator/mainBottomTabs';

const Stack = createNativeStackNavigator();

export const MainRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="omboarding" component={OnboardingRoutes} />
        <Stack.Screen name="auth" component={AuthStack} />
        <Stack.Screen name="bottomNav" component={MainBottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
