import React, {useEffect, useState} from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {MainBodyText} from '../../../../components/texts/mainBodyText';
import {COLORS} from '../../../../constants/colors';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {GreenCircle} from '../../../../components/greenCircle';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {FONTS} from '../../../../constants/fonts';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {MyButton} from '../../../../components/button';
import {ProfileOverview} from './profileOverview';
import {getCustomerById} from '../../../../api/customer';
import {getProviderById} from '../../../../api/provider';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

export const PausePlay = (props: {state?: boolean; onPress?(): void}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
      }}>
      {props.state ? (
        <Icon name="pause-outline" size={15} />
      ) : (
        <Icon name="play-outline" size={15} />
      )}
    </TouchableOpacity>
  );
};

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  data?: any;
  onCompleteWork?(): void;
  providerId: string;
  onMessagePress?(): void;

  timer?: boolean;
  onToggleTimer?(): void;

  getTime?(time?: any): void;
  setTime?(time?: any): void;
}

export const StartWorking = (props: Props) => {
  const [provider, setProvider]: any = useState([]);
  const [dt, setDt] = useState(new Date().toLocaleString());
  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);
  async function getData() {
    const res = await getProviderById(props.providerId);

    if (res !== undefined) {
      setProvider(res);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const options = {
    container: {
      backgroundColor: 'white',
      padding: 5,
      borderRadius: 5,
      width: 82,
      height: 30,
    },
    text: {
      fontSize: 15,
      color: 'black',
      fontFamily: FONTS.P_REGULAR,
    },
  };

  return (
    <>
      <BottomCard
        style={{minHeight: '35%', alignItems: 'center'}}
        modalVisibility={props.modalVisibility}
        cardTop
        cardTopChildren={
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Stopwatch
                start={props.timer}
                options={options}
                getTime={props.getTime}
                startTime={props.setTime}
              />
              <PausePlay state={props.timer} onPress={props.onToggleTimer} />
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                // onPress={props.onMessagePress}
                style={[styles.messageCont, {}]}>
                <Icon name="call-outline" size={30} color={COLORS.MAIN_1} />
              </TouchableOpacity>
              <View style={{height: 10}} />
              <TouchableOpacity
                onPress={props.onMessagePress}
                style={[styles.messageCont, {}]}>
                <Icon
                  name="chatbubble-ellipses-outline"
                  size={30}
                  color={COLORS.MAIN_1}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        cardTopStyle={{
          width: '90%',
          //alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: 10,
        }}
        onOutsidePress={props.onOutisdePress}>
        {/* <TouchableOpacity style={[styles.messageCont, {marginTop: -200}]}>
          <Icon
            name="chatbubble-ellipses-outline"
            size={30}
            color={COLORS.MAIN_1}
          />
        </TouchableOpacity> */}
        <ScrollableView>
          <View style={{width: '90%'}}>
            <ProfileOverview name={provider.name} data={provider} />
          </View>
          <View style={{width: '90%', marginVertical: 10}}>
            <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
            <Text style={[styles.value]}>
              {provider.location ?? 'No location given'}
            </Text>
          </View>
          <View style={{width: '90%', marginVertical: 10}}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              Selected Services
            </Text>
            <Text style={[styles.value]}>
              {props.data.services ?? 'No services given'}
            </Text>
          </View>
          <View style={{width: '90%'}}>
            <MyButton title="Complete Work" onPress={props.onCompleteWork} />
          </View>
        </ScrollableView>
      </BottomCard>
    </>
  );
};

const styles = StyleSheet.create({
  value: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },

  btnRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 20,
    marginBottom: '10%',
  },
  messageCont: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
