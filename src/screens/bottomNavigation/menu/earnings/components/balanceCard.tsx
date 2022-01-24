import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';

interface Props {
  earnings?: boolean;
  withdraw?: boolean;
}

export const BalanceCard = (props: Props) => {
  return (
    <ImageBackground
      borderRadius={5}
      source={ICONS.earningbg}
      // height={85}
      // width={160}
      //resizeMode="center"
      style={styles.main}>
      <View
        style={{
          width: '80%',
          height: '80%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text style={[styles.title, {marginBottom: 5}]}>
          Total
          {props.earnings && ' Earning'}
          {props.withdraw && ' Withdrawl'}
        </Text>
        <Text style={styles.balance}>$5055.00</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    //width:160,
    height: 85,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    //borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 3,
  },
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: 'white',
  },
  balance: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 20,
    color: 'white',
  },
  imegCont: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: '#f1f7ec',
  },
  wallet: {
    width: 34.63,
    height: 35.75,
  },
  cash: {
    width: 35.75,
    height: 34.56,
  },
});
