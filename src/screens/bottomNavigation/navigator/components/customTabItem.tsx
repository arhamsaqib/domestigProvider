import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

interface Props {
  focused?: boolean;
  name?: string;
  icon?: any;
  navigation?: any;
  iconName: string;
}

export const CustomerTabItem = (props: Props) => {
  const {navigation} = props;
  const nav = navigation.navigation;
  const route = navigation.route;
  const isFocused = nav.isFocused();

  return (
    <>
      <TouchableOpacity
        onPress={() => nav.navigate(route.name)}
        // onPress={() => props.navigation.goBack()}
        style={[
          styles.main,
          isFocused && styles.focused,
          !isFocused && {marginHorizontal: '5%'},
        ]}>
        <Icon
          name={props.iconName}
          color={!isFocused ? 'black' : COLORS.MAIN_1}
          size={25}
        />

        {isFocused && (
          <Text
            style={[
              styles.tabBarLabelStyle,
              isFocused && {color: COLORS.MAIN_1},
            ]}>
            {props.name}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 2,
  },
  tabBarLabelStyle: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 12,
    marginLeft: 10,
    color: '#666666',
  },
  focused: {
    backgroundColor: COLORS.light_green,
    minWidth: '25%',
  },
});
