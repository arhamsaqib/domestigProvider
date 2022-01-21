import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {GlobalStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {ICONS} from '../../../../constants/icons';
import {PaymentCard} from './components/paymentCard';

export const Services = ({navigation}: any) => {
  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <View style={styles.topRow}>
        <View style={{width: '15%', alignItems: 'flex-start'}}>
          <BackIcon black onPress={() => navigation.goBack()} />
        </View>
        <View style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
          <PageNameText>Services</PageNameText>
        </View>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <PaymentCard name="En-Suites & Cloakroom" />
        <PaymentCard name="En-Suites & Cloakroom" showTiming />
        <PaymentCard name="En-Suites & Cloakroom" />
      </View>
    </SafeAreaView>
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
  bottom: {
    position: 'absolute',
    width: '90%',
    bottom: 10,
  },
});
