import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Avatar} from '../../../../components/avatar';
import {Divider} from '../../../../components/divider';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {DrawerOption} from './drawerOption';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {GlobalStyles} from '../../../../common/styles';

export const Drawer = ({navigation}: any) => {
  const options = [
    {
      name: 'Home',
      iconName: 'home-outline',
      //onPress: () => navigation.navigate({key: 'hehe'}),
    },
    {
      name: 'History',
      iconName: 'time-outline',
      //onPress: () => navigation.navigate(''),
    },
    {
      name: 'Notification',
      iconName: 'notifications-outline',
      //onPress: () => navigation.navigate(''),
    },
    {
      name: 'My account',
      iconName: 'person-outline',
      onPress: () => navigation.navigate('userAccount'),
    },
    {
      name: 'Earnings',
      iconName: 'wallet-outline',
      onPress: () => navigation.navigate('earnings'),
    },
    {
      name: 'Documents',
      iconName: 'documents-outline',
      onPress: () => navigation.navigate('documents'),
    },
    {
      name: 'Services',
      iconName: 'apps',
      onPress: () => navigation.navigate('services'),
    },
    {
      name: 'Language',
      iconName: 'globe-outline',
      onPress: () => navigation.navigate('language'),
    },
    {
      name: 'Share & Discount',
      iconName: 'share-social',
      onPress: () => navigation.navigate('referrals'),
    },
    {
      name: 'Terms & Conditions',
      iconName: 'book-outline',
      onPress: () => navigation.navigate('tos'),
    },
    {
      name: 'Privacy Policy',
      iconName: 'book-outline',
      onPress: () => navigation.navigate('privacyPolicy'),
    },
  ];

  const renderOptions = (item: any) => {
    return (
      <DrawerOption
        name={item.name}
        iconName={item.iconName}
        onPress={item.onPress}
      />
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <Avatar customSize size={70} />
      <Text style={[styles.name, {marginVertical: 10}]}>Arham Saqib</Text>
      <View style={styles.ratingCont}>
        <Image
          style={[styles.rating, {marginRight: 5}]}
          source={ICONS.rating}
        />
        <Text style={styles.ratingTxt}>4.5 out of 5</Text>
      </View>
      <Divider />
      <ScrollableView>
        <View style={{width: '80%', marginTop: 10}}>
          {options.map(renderOptions)}
        </View>
        <View style={{width: '80%', marginTop: 20}}>
          <DrawerOption name="Log-out" iconName="log-out-outline" />
        </View>
      </ScrollableView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
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
  ratingCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
