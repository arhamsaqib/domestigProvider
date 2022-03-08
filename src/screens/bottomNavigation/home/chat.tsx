import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GlobalStyles} from '../../../common/styles';
import {Avatar} from '../../../components/avatar';
import {PageNameText} from '../../../components/texts/pageNameText';
import messaging from '@react-native-firebase/messaging';
import {SentMessage} from './components/sentMessage';
import {MyButton} from '../../../components/button';
import {ReceivedMessage} from './components/receivedMessage';

export const Chat = () => {
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  return (
    <SafeAreaView style={[GlobalStyles.screenMain]}>
      <View
        style={[GlobalStyles.subView, {marginTop: 10, alignItems: 'center'}]}>
        <Avatar customSize size={45} />
        <PageNameText style={{fontSize: 15}}>Arham Saqib</PageNameText>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        {/* <MyButton /> */}
        <SentMessage />
        <ReceivedMessage />
      </View>
    </SafeAreaView>
  );
};
