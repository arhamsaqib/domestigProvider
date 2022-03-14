import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drawer} from '../navigator/components/drawer';
import {AccountTopBar} from './account/accountTopBar';
import {Language} from './language/language';
import {Referrals} from './sharendiscount/referrals';
import {TOS} from './tos/tos';
import {PrivacyPolicy} from './privacypolicy/policy';
import {Earnings} from './earnings/earnings';
import {Documents} from './documents/documents';
import {Services} from './services/services';
import {NavigationContainer} from '@react-navigation/native';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

const Stack = createNativeStackNavigator();

export const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="drawer" component={Drawer} />
      <Stack.Screen name="userAccount" component={AccountTopBar} />
      <Stack.Screen name="documents" component={Documents} />
      <Stack.Screen name="services" component={Services} />
      <Stack.Screen name="earnings" component={Earnings} />
      <Stack.Screen name="language" component={Language} />
      <Stack.Screen name="referrals" component={Referrals} />
      <Stack.Screen name="tos" component={TOS} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  modalView1: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //marginBottom: 20,
  },

  modalView2: {
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  arrowDown: {
    width: 40,
    height: 6,
  },
  row: {
    flexDirection: 'row',
    height: '100%',
  },
});
