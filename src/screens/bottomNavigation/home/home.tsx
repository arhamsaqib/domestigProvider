import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {
  getProviderIncomingRequests,
  rejectIncomingRequest,
  acceptIncomingRequest,
} from '../../../api/incomingRequests';
import {GlobalStyles} from '../../../common/styles';
import {Avatar} from '../../../components/avatar';
import {BottomCard} from '../../../components/bottomCard';
import {CustomSwitch} from '../../../components/customSwitch';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {HistoryCard} from '../history/components/historyCard';
import {ConfirmRejectRequest} from './components/confirmReject';
import {IncomingRequest} from './components/incomingRequest';

export const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [requests, setRequests]: any = useState([]);
  const [confirmReject, setConfirmReject]: any = useState(false);
  const [selectedRequest, setSelectedRequest]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  function renderIncoming({item}: any) {
    return (
      <HistoryCard
        title={item.category_name + ' (' + item.bookingServices + ' )'}
        status={item.bookingStatus}
        onPress={() => {
          setSelectedRequest(item);
          setIncoming(true);
        }}
      />
    );
  }
  async function getData() {
    setLoader(true);
    const res = await getProviderIncomingRequests(state.id).finally(() =>
      setLoader(false),
    );
    if (res !== undefined) {
      setRequests(res);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  async function onRejectPress() {
    setIncoming(false);
    const data = {
      provider_id: state.id,
      booking_id: selectedRequest.booking_id,
    };
    const res = await rejectIncomingRequest(data).finally(() => {
      getData();
    });
  }
  async function onAcceptPress() {
    setIncoming(false);
    const data = {
      provider_id: state.id,
      booking_id: selectedRequest.booking_id,
    };
    const res = await acceptIncomingRequest(data).finally(() => {
      getData();
    });
  }
  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <View style={[GlobalStyles.row, GlobalStyles.subView, {marginTop: 50}]}>
        <View style={[GlobalStyles.row, {width: '45%'}]}>
          <Avatar customSize size={50} />
          <View style={{height: '90%', alignSelf: 'center'}}>
            <Text style={styles.gm}>Good Morning</Text>
            <Text style={styles.name}>Arham S.</Text>
          </View>
        </View>
        <View style={[GlobalStyles.row, {width: '30%'}]}>
          <Text style={styles.gm}>
            {toggle && 'Online'}
            {!toggle && 'Offline'}
          </Text>
          <CustomSwitch isOn={toggle} onToggle={() => setToggle(!toggle)} />
        </View>
      </View>
      {loader && <ActivityIndicator color={COLORS.MAIN_1} />}
      <View style={[GlobalStyles.subView, {marginTop: 30}]}>
        <PageNameText style={{marginBottom: 20}}>
          Incoming Requests
        </PageNameText>
        <FlatList data={requests} renderItem={renderIncoming} />
      </View>
      <IncomingRequest
        modalVisibility={incoming}
        onOutisdePress={() => setIncoming(false)}
        data={selectedRequest}
        onRejectPress={() => {
          setIncoming(false);
          setConfirmReject(true);
        }}
        //onRejectPress={onRejectPress}
        onAcceptPress={onAcceptPress}
      />
      <ConfirmRejectRequest
        modalVisibility={confirmReject}
        onYesPress={onRejectPress}
        onNoPress={() => setConfirmReject(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gm: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: COLORS.WF_TITLE,
  },
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
});
