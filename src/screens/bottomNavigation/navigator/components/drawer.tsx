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
import auth from '@react-native-firebase/auth';

export const Drawer = ({navigation, onClose}: any) => {
  //const navigation = useNavigation();

  function navTo(screen: any) {
    navigation.navigate('menu', {screen: screen});
    onClose();
  }

  const options = [
    {
      name: 'Home',
      onPress: () => {
        navigation.navigate('home');
        onClose();
      },
      image: {
        source: ICONS.home,
        style: {width: 18, height: 20},
      },
    },
    {
      name: 'History',
      onPress: () => {
        navigation.navigate('history');
        onClose();
      },
      image: {
        source: ICONS.history,
        style: {width: 20, height: 18},
      },
    },
    {
      name: 'Notification',
      onPress: () => {
        navigation.navigate('notification');
        onClose();
      },
      image: {
        source: ICONS.bell,
        style: {width: 18, height: 20},
      },
    },
    {
      name: 'My account',
      onPress: () => navTo('userAccount'),
      image: {
        source: ICONS.account,
        style: {width: 18, height: 20},
      },
    },
    {
      name: 'Earnings',
      onPress: () => navTo('earnings'),
      image: {
        source: ICONS.wallet1,
        style: {width: 20, height: 19},
      },
    },
    {
      name: 'Documents',
      onPress: () => navTo('documents'),
      image: {
        source: ICONS.docs,
        style: {width: 17.14, height: 20},
      },
    },
    {
      name: 'Services',
      onPress: () => navTo('services'),
      image: {
        source: ICONS.services,
        style: {width: 19, height: 19},
      },
    },
    {
      name: 'Language',
      onPress: () => navTo('language'),
      image: {
        source: ICONS.language,
        style: {width: 20, height: 20},
      },
    },
    {
      name: 'Share & Discount',
      onPress: () => navTo('referrals'),
      image: {
        source: ICONS.share,
        style: {width: 18.5, height: 20},
      },
    },
    {
      name: 'Terms & Conditions',
      onPress: () => navTo('tos'),
      image: {
        source: ICONS.book,
        style: {width: 20, height: 15},
      },
    },
    {
      name: 'Privacy Policy',
      onPress: () => navTo('privacyPolicy'),
      image: {
        source: ICONS.book,
        style: {width: 20, height: 15},
      },
    },
  ];

  const renderOptions = (item: any) => {
    return (
      <DrawerOption
        name={item.name}
        iconName={item.iconName}
        onPress={item.onPress}
        image={item.image}
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

  async function onLogout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('auth');
      });
  }

  return (
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
          <DrawerOption
            name="Log-out"
            iconName="log-out-outline"
            onPress={onLogout}
          />
        </View>
      </ScrollableView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    height: '100%',
    marginTop: 15,
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
