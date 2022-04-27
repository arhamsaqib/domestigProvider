import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Avatar} from '../../../components/avatar';
import {PageNameText} from '../../../components/texts/pageNameText';
import {SentMessage} from './components/sentMessage';
import {ReceivedMessage} from './components/receivedMessage';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../constants/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../constants/colors';

import {GiftedChat, Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {BackIcon} from '../../../components/backIcon';
import {MEDIA_URL} from '../../../constants/url';

export const SendButton = (props: {onPress?(): void; disabled?: boolean}) => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <LinearGradient
        style={{
          height: 25,
          width: 25,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        colors={[COLORS.MAIN_1, COLORS.MAIN_2]}>
        <Icon name="arrow-forward-outline" size={17} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const Chat = ({route, navigation}: any) => {
  const [messages, setMessages]: any = useState([]);

  useEffect(() => {
    const docId = 'b:' + bid + '-c:' + cid + '-p:' + pid;
    const subscribe = firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let data: any = change.doc.data();
            console.log(data, 'all messages');
            data.createdAt = data?.createdAt?.toDate();
            setMessages((prevMessages: any) =>
              GiftedChat.append(prevMessages, data),
            );
          }
        });
      });
    return () => subscribe();
  }, []);
  const bid = route.params.booking_id;
  const pid = route.params.provider_id;
  const cid = route.params.customer_id;

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const newMsg = {
      ...msg,
      from: 'provider',
      sentTo: cid,
      sentBy: pid,
      // createdAt: new Date(),
    };

    console.log(msg, 'On send message');
    const docId = 'b:' + bid + '-c:' + cid + '-p:' + pid;

    firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .add({...newMsg, createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}>
          <SafeAreaView
            style={{
              position: 'absolute',
              left: 20,

              alignItems: 'center',
              height: 30,
              justifyContent: 'center',
            }}>
            <BackIcon black onPress={() => navigation.goBack()} />
          </SafeAreaView>
          <View
            style={[
              {
                marginVertical: 10,
                alignItems: 'center',
                alignSelf: 'center',
              },
            ]}>
            <Avatar
              customSize
              size={45}
              source={
                route.params.customer_details.avatar && {
                  uri: MEDIA_URL + route.params.customer_details.avatar,
                }
              }
            />
            <PageNameText style={{fontSize: 15}}>
              {route.params.customer_details.name}
            </PageNameText>
          </View>
        </View>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          renderMessage={message => {
            const itm: any = message.currentMessage;
            return (
              <View style={{width: '90%', alignSelf: 'center'}}>
                {itm.from === 'customer' && (
                  <ReceivedMessage message={itm.text} />
                )}
                {itm.from === 'provider' && <SentMessage message={itm.text} />}
              </View>
            );
          }}
          textInputProps={{
            fontFamily: FONTS.P_Light,
            width: '100%',
            padding: 10,
            color: 'black',
          }}
          placeholder={'Write your message..'}
          renderSend={props => {
            const {sendButtonProps, ...rest} = props;
            return (
              <Send
                {...rest}
                sendButtonProps={{
                  style: {
                    alignSelf: 'center',
                    marginRight: '1%',
                  },
                }}>
                <SendButton disabled />
              </Send>
            );
          }}
          renderAvatar={() => null}
          user={{
            _id: pid,
          }}
        />
      </SafeAreaView>
    </>
  );
};
