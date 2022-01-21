import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeadCard} from '../../../components/headCard';
import {MyButton} from '../../../components/button';
import {Alert} from 'react-native';
import {DrawerOpener} from './components/drawerOpener';
import {Drawer} from './components/drawer';
import {HomeStack} from '../home/homeStack';

const BottomNav = createBottomTabNavigator();

const SamplePage = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.MAIN_SUBTEXT}}>
      <HeadCard />
    </SafeAreaView>
  );
};

const MainBottomNav = () => {
  return (
    <BottomNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: COLORS.MAIN_1,
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
        },
        tabBarActiveBackgroundColor: COLORS.light_green,
        tabBarItemStyle: {
          //borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          height: 35,
          alignSelf: 'center',
        },

        //tabBarShowLabel: false,
        tabBarStyle: {padding: 10},
      }}>
      <BottomNav.Screen
        name="home"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}: any) => (
            <Icon name="home-outline" color={color} size={25} />
          ),
        }}
      />
      <BottomNav.Screen
        name="notification"
        component={SamplePage}
        options={{
          title: 'Notification',
          tabBarIcon: ({color, focused}: any) => (
            <Icon name="notifications-outline" color={color} size={25} />
          ),
        }}
      />
      <BottomNav.Screen
        name="history"
        component={SamplePage}
        options={{
          title: 'History',
          tabBarIcon: ({color, focused}: any) => (
            <Icon name="time-outline" color={color} size={25} />
          ),
        }}
      />
      <BottomNav.Screen
        name="menu"
        //component={MenuStack}
        component={() => {
          return null;
        }}
        options={{
          title: 'Menu',
          tabBarIcon: ({color, focused}: any) => (
            <Icon name="menu-outline" color={color} size={25} />
          ),
          tabBarButton: (props: any) => <DrawerOpener />,
        }}
      />
    </BottomNav.Navigator>
  );
};

export default MainBottomNav;
