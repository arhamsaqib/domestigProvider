import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProviderReviews} from './providerReviews';
import {BottomCard} from '../../../../components/bottomCard';
import {ProviderProfileDetails} from './providerProfileDetails';
import {Avatar} from '../../../../components/avatar';
import {FONTS} from '../../../../constants/fonts';
import {COLORS} from '../../../../constants/colors';
import {ICONS} from '../../../../constants/icons';
import {MEDIA_URL} from '../../../../constants/url';
import {parse} from '@babel/core';
//@ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const TobTabs = createMaterialTopTabNavigator();

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  data?: any;
}

export const ProviderDetails = (props: Props) => {
  var width = Dimensions.get('screen').width;

  return (
    <BottomCard
      style={{height: '80%'}}
      onOutsidePress={props.onOutsidePress}
      modalVisibility={props.modalVisibility}>
      <KeyboardAwareScrollView style={{flex: 0}}>
        <View style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
          <Avatar
            customSize
            source={props.data.avatar && {uri: MEDIA_URL + props.data.avatar}}
            size={80}
            verified
          />
          <Text style={[styles.name, {marginVertical: 3}]}>
            {props.data.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={ICONS.rating}
              style={[styles.rating, {marginRight: 5}]}
            />
            <Text style={styles.ratingTxt}>
              {parseFloat(props.data.rating).toFixed(1)} out of 5
            </Text>
          </View>
        </View>
        <View
          style={{
            height: width / 0.5,
          }}>
          <TobTabs.Navigator
            screenOptions={{
              tabBarActiveTintColor: COLORS.MAIN_2,
              tabBarInactiveTintColor: COLORS.MAIN_SUBTEXT,
              tabBarLabelStyle: styles.label,
              tabBarIndicatorStyle: {
                borderColor: COLORS.MAIN_2,
                borderWidth: 1,
              },
            }}>
            <TobTabs.Screen
              name="providerDetails"
              component={ProviderProfileDetails}
              options={{title: 'Profile Details'}}
              initialParams={{user: props.data}}
            />
            <TobTabs.Screen
              name="providerReviews"
              component={ProviderReviews}
              options={{title: 'Reviews'}}
              initialParams={{user: props.data}}
            />
          </TobTabs.Navigator>
        </View>
      </KeyboardAwareScrollView>
    </BottomCard>
  );
};
const styles = StyleSheet.create({
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
  label: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
  },
  rating: {
    height: 12,
    width: 12,
  },
  ratingTxt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 10,
    color: COLORS.MAIN_TEXT,
    opacity: 0.42,
  },
});
