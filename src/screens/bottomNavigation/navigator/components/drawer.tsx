import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Avatar} from '../../../../components/avatar';
import {Divider} from '../../../../components/divider';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {DrawerOption} from './drawerOption';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getProviderById} from '../../../../api/provider';
import {MEDIA_URL} from '../../../../constants/url';

export const Drawer = ({navigation}: any) => {
  //const navigation = useNavigation();
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

  const [user, setUser]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [avatar, setAvatar]: any = useState(null);
  async function getData() {
    const res = await getProviderById(state.id);
    if (res !== undefined) {
      setUser(res);
      if (res.avatar.length > 1) {
        setAvatar(MEDIA_URL + res.avatar);
      }
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{width: '20%', backgroundColor: COLORS.WF2}} />
      <SafeAreaView style={[styles.main, styles.elevated_card]}>
        <Avatar customSize size={70} source={avatar && {uri: avatar}} />
        <Text style={[styles.name, {marginVertical: 10}]}>{user.name}</Text>
        <View style={styles.ratingCont}>
          <Image
            style={[styles.rating, {marginRight: 5}]}
            source={ICONS.rating}
          />
          <Text style={styles.ratingTxt}>
            {parseFloat(user.rating).toFixed(1)} out of 5
          </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    //flex: 1,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'flex-end',
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
  elevated_card: {
    //padding: 10,
    elevation: 1,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: 'white',
    //borderRadius: 10,
    //marginVertical: 10,
    height: '100%',
  },
});
