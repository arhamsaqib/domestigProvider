import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Avatar} from '../../../../components/avatar';
import {COLORS} from '../../../../constants/colors';
import {ProfileDetails} from './details';
import {Reviews} from './reviews';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackIcon} from '../../../../components/backIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from 'react-native-image-crop-picker';
import {uploadImage} from '../../../../api/uploadImage';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getProviderById, updateProvider} from '../../../../api/provider';
import {MEDIA_URL} from '../../../../constants/url';

const TobTabs = createMaterialTopTabNavigator();

export const AccountTopBar = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [loader, setLoader] = useState(false);
  const [fileUri, setFileUri]: any = useState(null);
  const [provider, setProvider]: any = useState([]);
  async function onImagePick() {
    let result: any = await ImageCropPicker.openPicker({});
    console.log(result, 'Image picked');
    if (!result.cancelled) {
      setFileUri(result.path.toString());
    }
    setLoader(true);
    const res: any = await uploadImage(result);
    console.log(res, 'upload res 1');
    if (res.id !== undefined) {
      const up = await updateProvider(state.id, {avatar: res.uri}).finally(() =>
        setLoader(false),
      );
    }
  }
  async function getData() {
    setLoader(true);
    const res = await getProviderById(state.id).finally(() => setLoader(false));
    if (res !== undefined) {
      if (res.avatar.length > 1) setFileUri(MEDIA_URL + res.avatar);
    }
    setProvider(res);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <View style={styles.card}>
        <SafeAreaView
          style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
          <View style={styles.row}>
            <BackIcon black onPress={() => navigation.goBack()} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="log-out-outline"
                size={20}
                color={COLORS.MAIN_SUBTEXT}
              />
              <Text style={[styles.log, {marginLeft: 5}]}>Log-out</Text>
            </View>
          </View>
          <View style={{marginVertical: 20}} />
          <Avatar
            onPress={onImagePick}
            customSize
            size={110}
            upload
            source={fileUri && {uri: fileUri}}
            pressable
          />
          <Text style={[styles.name, {marginVertical: 3}]}>
            {provider.name}
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
              {parseFloat(provider.rating).toFixed(1)} out of 5
            </Text>
          </View>
          {loader && <ActivityIndicator color={COLORS.MAIN_1} />}
        </SafeAreaView>
      </View>
      <TobTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.MAIN_2,
          tabBarInactiveTintColor: COLORS.MAIN_SUBTEXT,
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: {borderColor: COLORS.MAIN_2, borderWidth: 1},
        }}>
        <TobTabs.Screen
          name="profileDetails"
          component={ProfileDetails}
          options={{title: 'Profile Details'}}
        />
        <TobTabs.Screen
          name="profileReviews"
          component={Reviews}
          options={{title: 'Reviews'}}
        />
      </TobTabs.Navigator>
    </>
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
  card: {
    backgroundColor: '#eff4eb',
    width: '100%',
    alignItems: 'center',
    height: 304,
    //flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  log: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: COLORS.MAIN_SUBTEXT,
  },
});
