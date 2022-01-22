import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeadCard} from '../../../components/headCard';
import {DrawerOpener} from './components/drawerOpener';
import {HomeStack} from '../home/homeStack';
import {NotificationsStack} from '../notifications/notificationsStack';
import {HistoryStack} from '../history/historyStack';
import {MenuStack} from '../menu/menuStack';

const BottomNav = createBottomTabNavigator();

const Label = ({children}: any) => {
  return <Text style={styles.labelActive}>{children}</Text>;
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
          marginHorizontal: '1%',
        },

        //tabBarShowLabel: false,
        tabBarStyle: {
          padding: 10,
        },
      }}>
      <BottomNav.Screen
        name="home"
        component={HomeStack}
        options={{
          //title: 'Home',
          tabBarIcon: ({color, focused}: any) => (
            <Icon name="home-outline" color={color} size={25} />
          ),
          tabBarLabel: ({focused}) => {
            return <Label>{focused && 'Home'}</Label>;
          },
        }}
      />
      <BottomNav.Screen
        name="notification"
        component={NotificationsStack}
        options={{
          //title: 'Notification',
          tabBarIcon: ({color, focused}: any) => (
            <Icon name="notifications-outline" color={color} size={25} />
          ),
          tabBarLabel: ({focused}) => {
            return <Label>{focused && 'Notifications'}</Label>;
          },
        }}
      />
      <BottomNav.Screen
        name="history"
        component={HistoryStack}
        options={{
          //title: 'History',
          tabBarIcon: ({color, focused}: any) => (
            <Icon name="time-outline" color={color} size={25} />
          ),
          tabBarLabel: ({focused}) => {
            return <Label>{focused && 'History'}</Label>;
          },
        }}
      />
      <BottomNav.Screen
        name="menu"
        component={MenuStack}
        // component={() => {
        //   return null;
        // }}
        options={{
          //title: 'Menu',
          tabBarIcon: ({color, focused}: any) => (
            <Icon name="menu-outline" color={color} size={25} />
          ),
          tabBarLabel: ({focused}) => {
            return <Label>{focused && 'Menu'}</Label>;
          },
          // tabBarButton: (props: any) => <DrawerOpener />,
        }}
      />
    </BottomNav.Navigator>
  );
};

const styles = StyleSheet.create({
  labelActive: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.MAIN_1,
    marginLeft: '15%',
  },
});

export default MainBottomNav;
