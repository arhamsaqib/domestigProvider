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
  createBookingSubmission,
  showBookingSubmissionByPIDnBID,
  updateBookingSubmission,
} from '../../../api/bookingSubmission';
import {getCustomerById} from '../../../api/customer';
import {
  getProviderIncomingRequests,
  rejectIncomingRequest,
  acceptIncomingRequest,
  getProviderInProgress,
  verifyBooking,
} from '../../../api/incomingRequests';
import {GlobalStyles} from '../../../common/styles';
import {Avatar} from '../../../components/avatar';
import {BottomCard} from '../../../components/bottomCard';
import {CustomSwitch} from '../../../components/customSwitch';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {HistoryCard} from '../history/components/historyCard';
import {BeforeWorkImage} from './components/beforeWorkImage';
import {ConfirmRejectRequest} from './components/confirmReject';
import {IncomingRequest} from './components/incomingRequest';
import {ProviderArrived} from './components/providerArrived';
import {StartWorking} from './components/startWorking';
import {PhoneVerificationModel} from './components/verificationModel';
import {WaitingProvider} from './components/waitingProvider';

export const Home = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);

  const [verificationCode, setVerificationCode]: any = useState('');
  const [phoneVerficationModal, setPhoneVerificationModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [confirmReject, setConfirmReject]: any = useState(false);
  const [waitingProvider, setWaitingProvider]: any = useState(false);
  const [providerArrived, setProviderArrived]: any = useState(false);
  const [startWorking, setStartWorking]: any = useState(false);
  const [beforeModel, setBeforeModel] = useState(false);
  const [inProgressBooking, setinProgressBooking]: any = useState([]);
  const [requests, setRequests]: any = useState([]);
  const [selectedRequest, setSelectedRequest]: any = useState([]);
  const [submissionData, setSubmissionData]: any = useState([]);
  const [customer, setCustomer]: any = useState([]);
  const [timeTaken, setTimeTaken]: any = useState();
  const [timeStart, setTimeStart]: any = useState();

  const [timer, setTimer] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoader(true);
    const res = await getProviderIncomingRequests(state.id).finally(() =>
      setLoader(false),
    );
    if (res !== undefined) {
      setRequests(res);
    }
    const res1 = await getProviderInProgress(state.id);
    if (res1.id !== undefined) {
      setinProgressBooking(res1);
      if (res1.verified === 'true') {
        setProviderArrived(true);
      } else {
        setWaitingProvider(true);
      }
      const cus = await getCustomerById(inProgressBooking.customer_id);
      if (cus !== undefined) {
        setCustomer(cus);
      }
    }
    const submission = await showBookingSubmissionByPIDnBID({
      booking_id: res1.id,
      provider_id: state.id,
    });
    console.log(submission, 'Submission data');
    if (submission.id !== undefined) {
      setSubmissionData(submission);
      var target = new Date('1970-01-01 ' + submission.time_taken);
      console.log(submission.time_taken, 'time to start');

      let regExTime: any = /([0-9]?[0-9]):([0-9][0-9]):([0-9][0-9])/;
      let regExTimeArr = regExTime.exec(submission.time_taken);
      let timeHr = regExTimeArr[1] * 3600 * 1000;
      let timeMin = regExTimeArr[2] * 60 * 1000;
      let timeSec = regExTimeArr[3] * 1000;

      let timeMs = timeHr + timeMin + timeSec;
      setTimeStart(timeMs);
      if (submission.before_work_image.length > 10) {
        setProviderArrived(false);
        setStartWorking(true);
      }
    }
  }

  async function onRejectPress() {
    setIncoming(false);
    const data = {
      provider_id: state.id,
      booking_id: selectedRequest.booking_id,
    };
    const res = await rejectIncomingRequest(data).finally(() => {
      setConfirmReject(false);
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

  async function onCodeSubmit() {
    if (inProgressBooking.verification_code === verificationCode) {
      console.log('code matched');
      const res = await verifyBooking(inProgressBooking.id);
      setPhoneVerificationModal(false);
      setProviderArrived(true);

      getData();
    } else {
      console.log('code not matched');
    }
  }

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
  async function onBeforeImageSubmit(image: any) {
    //console.log(image, 'Image data');
    const data = {
      provider_id: state.id,
      booking_id: inProgressBooking.id,
      //before_work_image: image.data,
      before_work_image: image.sourceURL,
      time_taken: '00:00:00',
    };
    const res = await createBookingSubmission(data);
    console.log(res);

    // if (res.id !== undefined) {
    setBeforeModel(false);
    setStartWorking(true);
    setTimer(true);
    // }
  }
  async function saveProgress(timerState: any) {
    if (!timerState) {
      console.log(timeTaken, 'Time takes');
      const data = {
        provider_id: state.id,
        booking_id: inProgressBooking.id,
        time_taken: timeTaken,
      };
      const res = await updateBookingSubmission(inProgressBooking.id, data);
      console.log(res, 'Update time response');

      // setStartWorking(true);
    }
    //console.log(image, 'Image data');

    // }
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
      <WaitingProvider
        modalVisibility={waitingProvider}
        data={inProgressBooking}
        onArrivedPress={() => {
          setWaitingProvider(false);
          setPhoneVerificationModal(true);
        }}
      />
      <PhoneVerificationModel
        modalVisibility={phoneVerficationModal}
        setVerificationCode={setVerificationCode}
        onSubmitPress={onCodeSubmit}
      />
      <ProviderArrived
        modalVisibility={providerArrived}
        providerId={state.id}
        data={inProgressBooking}
        onStartWorking={() => {
          setProviderArrived(false);
          setBeforeModel(true);
        }}
      />
      <BeforeWorkImage
        modalVisibility={beforeModel}
        onSubmitPress={onBeforeImageSubmit}
      />
      <StartWorking
        modalVisibility={startWorking}
        providerId={state.id}
        data={inProgressBooking}
        onToggleTimer={() => {
          setTimer(!timer);
          saveProgress(!timer);
        }}
        timer={timer}
        getTime={setTimeTaken}
        setTime={timeStart}
        onMessagePress={() => {
          setStartWorking(false);
          navigation.navigate('chat', {
            booking_id: inProgressBooking.id,
            customer_id: inProgressBooking.customer_id,
            provider_id: state.id,
            customer_details: customer,
          });
        }}
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
