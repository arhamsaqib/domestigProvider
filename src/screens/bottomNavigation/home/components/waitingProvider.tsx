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

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  data?: any;
  onArrivedPress?(): void;
  customer?: any;
}

export const WaitingProvider = (props: Props) => {
  const {customer} = props;
  // const [customer, setCustomer]: any = useState([]);
  // async function getData() {
  //   const res = await getCustomerById(props.data.customer_id);

  //   if (res !== undefined) {
  //     setCustomer(res);
  //   }
  // }
  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <BottomCard
      style={{height: '30%', alignItems: 'center'}}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutisdePress}>
      <ScrollableView>
        <View style={{width: '90%'}}>
          <ProfileOverview name={customer.name} />
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <Text style={[styles.value]}>
            {customer.location ?? 'No location given'}
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
          <MyButton title="Arrived" onPress={props.onArrivedPress} />
        </View>
      </ScrollableView>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    marginBottom: 20,
  },
  categoryNameContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 16,
    color: COLORS.WF_TITLE,
  },
  head: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 18,
    color: COLORS.WF_TITLE,
  },
  value: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  valueBold: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
  pDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  avatrNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 80,
    width: '100%',
  },
  btnRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 20,
    marginBottom: '10%',
  },
});
