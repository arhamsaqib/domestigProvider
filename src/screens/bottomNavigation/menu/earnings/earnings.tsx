import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BackIcon} from '../../../../components/backIcon';
import {MyButton} from '../../../../components/button';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {BalanceCard} from './components/balanceCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../../constants/fonts';
import {COLORS} from '../../../../constants/colors';
import {TransactionsCard} from './components/transactionsCard';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {AddBalanceCard} from './components/addBalanceCard';
import {GlobalStyles} from '../../../../common/styles';
import {createAccountToken} from '../../../../api/stripe/bankAccount';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getProviderById} from '../../../../api/provider';
import {updateStripeUserAccount} from '../../../../api/stripe/stripeCustomer';

export const Earnings = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [user, setuser]: any = useState([]);
  const [show, setShow] = useState(false);
  async function onWithdrawPress(data: any) {
    console.log(data, 'in function');
    const res = await createAccountToken(data);
    console.log(res, 'Create card response');
    if (res.id) {
      const upd = await updateStripeUserAccount(
        {account_token: res.id},
        user.stripeId,
      );
      console.log(upd, 'Update Status');
    }
  }

  async function getData() {
    const res = await getProviderById(state.id);
    if (res !== undefined) {
      setuser(res);
    }
    console.log(res, 'res');
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <AddBalanceCard
        modalVisibility={show}
        onOutsidePress={() => setShow(false)}
        onWithdrawPress={onWithdrawPress}
      />
      <ScrollableView>
        <View style={styles.topRow}>
          <View style={{width: '15%', alignItems: 'flex-start'}}>
            <BackIcon black onPress={() => navigation.goBack()} />
          </View>
          <View
            style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
            <PageNameText>Earnings</PageNameText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width: '48%'}}>
            <BalanceCard earnings />
          </View>
          <View style={{width: '48%'}}>
            <BalanceCard withdraw />
          </View>
        </View>
        <View style={[styles.row, {marginVertical: 20}]}>
          <Text style={styles.name}>All Reviews</Text>
          <Icon name="filter-outline" size={15} onPress={() => {}} />
        </View>
        <View style={{width: '90%'}}>
          <TransactionsCard />
        </View>
        <View style={styles.bottom}>
          <MyButton title="Withdraw balance" onPress={() => setShow(true)} />
        </View>
      </ScrollableView>
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
    // position: 'absolute',
    width: '90%',
    //bottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
});
