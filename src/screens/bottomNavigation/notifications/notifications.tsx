import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getProviderNotifications} from '../../../api/providerNotifications';
import {GlobalStyles} from '../../../common/styles';
import {PageNameText} from '../../../components/texts/pageNameText';
import {FONTS} from '../../../constants/fonts';
import {NotificationCard} from './components/notificationCard';

export const Notification = () => {
  const [notifications, setNotifications]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    const res = await getProviderNotifications(state.id);
    if (res !== undefined) {
      setNotifications(res);
    }
    //console.log(res, 'notif');
  }

  function renderNotifications({item}: any) {
    return <NotificationCard title={item.description} />;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PageNameText>Notifications</PageNameText>
        <Text onPress={() => {}} style={styles.optionText}>
          Mark all as read
        </Text>
      </View>
      <View style={{marginTop: 10, width: '100%'}}>
        <FlatList data={notifications} renderItem={renderNotifications} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  optionText: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: '#222222',
  },
});
