import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../../constants/colors';
import {DrawerOpener} from './components/drawerOpener';
import {HomeStack} from '../home/homeStack';
import {NotificationsStack} from '../notifications/notificationsStack';
import {HistoryStack} from '../history/historyStack';
import {MenuStack} from '../menu/menuStack';
import {CustomerTabItem} from './components/customTabItem';

const BottomNav = createBottomTabNavigator();

const MainBottomNav = () => {
  return (
    <BottomNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: COLORS.MAIN_1,
        tabBarInactiveTintColor: '#666666',
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
        },
        tabBarActiveBackgroundColor: COLORS.light_green,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          height: 35,
          alignSelf: 'center',
          alignContent: 'center',
        },
        tabBarStyle: {
          height: 83,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <BottomNav.Screen
        name="home"
        component={HomeStack}
        options={navigation => ({
          tabBarButton: props => (
            <CustomerTabItem
              name="Home"
              navigation={navigation}
              iconName="home-outline"
            />
          ),
        })}
      />
      <BottomNav.Screen
        name="notification"
        component={NotificationsStack}
        options={navigation => ({
          tabBarButton: props => (
            <CustomerTabItem
              name="Notifications"
              navigation={navigation}
              iconName="notifications-outline"
            />
          ),
        })}
      />
      <BottomNav.Screen
        name="history"
        component={HistoryStack}
        options={navigation => ({
          tabBarButton: props => (
            <CustomerTabItem
              name="History"
              navigation={navigation}
              iconName="time-outline"
            />
          ),
        })}
      />
      <BottomNav.Screen
        name="menu"
        component={MenuStack}
        options={navigation => ({
          title: 'Menu',

          tabBarButton: props => (
            <DrawerOpener
              navigation={navigation}
              iconName="menu-outline"
              name="Menu"
            />
          ),
        })}
      />
    </BottomNav.Navigator>
  );
};

export default MainBottomNav;
