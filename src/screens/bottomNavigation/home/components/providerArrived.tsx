import React, {useEffect, useState} from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {MainBodyText} from '../../../../components/texts/mainBodyText';
import {COLORS} from '../../../../constants/colors';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {GreenCircle} from '../../../../components/greenCircle';
import {StyleSheet, View, Text} from 'react-native';
import {FONTS} from '../../../../constants/fonts';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {MyButton} from '../../../../components/button';
import {ProfileOverview} from './profileOverview';
import {getCustomerById} from '../../../../api/customer';
import {getProviderById} from '../../../../api/provider';
import {useSelector} from 'react-redux';

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  data?: any;
  onStartWorking?(): void;
  providerId: string;
}

export const ProviderArrived = (props: Props) => {
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
  return (
    <>
      <View style={styles.timeCont}></View>
      <BottomCard
        style={{minHeight: '35%', alignItems: 'center'}}
        modalVisibility={props.modalVisibility}
        onOutsidePress={props.onOutisdePress}>
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
            <MyButton title="Start Working" onPress={props.onStartWorking} />
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
  timeCont: {},
});
