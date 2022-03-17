import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getProviderAllBookings} from '../../../api/bookings';
import {GlobalStyles} from '../../../common/styles';
import {PageNameText} from '../../../components/texts/pageNameText';
import {ToggleButton} from '../../../components/toggleButton';
import {COLORS} from '../../../constants/colors';
import {HistoryCard} from './components/historyCard';

export const HistoryMain = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState('in-progress');
  const [bookings, setBookings]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function GetData() {
    setLoader(true);
    const res = await getProviderAllBookings(state.id).finally(() => {
      setLoader(false);
    });
    if (res !== undefined) {
      setBookings(res);
    }
  }
  useEffect(() => {
    GetData();
  }, []);
  const renderHistory = ({item}: any) => {
    return (
      <>
        {(filter === item.status ||
          (filter === 'in-progress' && item.status === 'pending')) && (
          <HistoryCard
            status={item.status}
            title={item.category_name + '(' + item.services + ')'}
            onPress={() =>
              navigation.navigate('historyDetails', {details: item})
            }
          />
        )}
      </>
    );
  };
  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <View style={{width: '90%', marginVertical: 10}}>
        <PageNameText>Booking History</PageNameText>
      </View>
      <View style={styles.filterCont}>
        <View style={{width: '30%'}}>
          <ToggleButton
            name="Current"
            onPress={() => setFilter('in-progress')}
            active={filter === 'in-progress' && true}
          />
        </View>
        <View style={{width: '30%'}}>
          <ToggleButton
            name="Past"
            onPress={() => setFilter('completed')}
            active={filter === 'completed' && true}
          />
        </View>
        <View style={{width: '30%'}}>
          <ToggleButton
            name="Up-coming"
            onPress={() => setFilter('upcoming')}
            active={filter === 'upcoming' && true}
          />
        </View>
      </View>
      <View style={{width: '90%', marginVertical: 10}}>
        {loader && <ActivityIndicator color={COLORS.MAIN_1} size="small" />}

        <FlatList
          refreshControl={
            <RefreshControl onRefresh={GetData} refreshing={false} />
          }
          inverted
          renderItem={renderHistory}
          data={bookings}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterCont: {
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
