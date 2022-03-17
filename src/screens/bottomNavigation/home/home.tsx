import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {updateBooking} from '../../../api/bookings';
import {
  createBookingSubmission,
  showBookingSubmissionByPIDnBID,
  updateBookingSubmission,
} from '../../../api/bookingSubmission';
import {getCustomerById} from '../../../api/customer';
import {generateCustomerNotification} from '../../../api/customerNotifications';
import {
  getProviderIncomingRequests,
  rejectIncomingRequest,
  acceptIncomingRequest,
  getProviderInProgress,
  verifyBooking,
} from '../../../api/incomingRequests';
import {generateInvoice} from '../../../api/invoice';
import {getProviderById, updateProvider} from '../../../api/provider';
import {generateProviderNotification} from '../../../api/providerNotifications';
import {GlobalStyles} from '../../../common/styles';
import {Avatar} from '../../../components/avatar';
import {CustomSwitch} from '../../../components/customSwitch';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {HistoryCard} from '../history/components/historyCard';
import {AfterWorkImage} from './components/afterWorkImage';
import {BeforeWorkImage} from './components/beforeWorkImage';
import {ConfirmRejectRequest} from './components/confirmReject';
import {ExtraCharge} from './components/extraCharge';
import {IncomingRequest} from './components/incomingRequest';
import {ProviderArrived} from './components/providerArrived';
import {StartWorking} from './components/startWorking';
import {PhoneVerificationModel} from './components/verificationModel';
import {WaitingProvider} from './components/waitingProvider';
import {
  generateAcceptRequestNotification,
  generateOnCodeSubmitNotification,
  generateBeforeWorkImageSubmitNotification,
  generateAfterWorkImageSubmitNotification,
  generatePauseBookingNotification,
} from '../../../helpers/generateNotification';
import {FieldNameText} from '../../../components/texts/fieldNameText';
import {generateGreetings} from '../../../helpers/greetings';
import {MEDIA_URL} from '../../../constants/url';

export const Home = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);

  const [verificationCode, setVerificationCode]: any = useState('');
  const [avatar, setAvatar]: any = useState(null);
  const [phoneVerficationModal, setPhoneVerificationModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [confirmReject, setConfirmReject]: any = useState(false);
  const [waitingProvider, setWaitingProvider]: any = useState(false);
  const [providerArrived, setProviderArrived]: any = useState(false);
  const [startWorking, setStartWorking]: any = useState(false);
  const [beforeModel, setBeforeModel] = useState(false);
  const [afterModel, setAfterModel] = useState(false);
  const [inProgressBooking, setinProgressBooking]: any = useState([]);
  const [requests, setRequests]: any = useState([]);
  const [selectedRequest, setSelectedRequest]: any = useState([]);
  const [submissionData, setSubmissionData]: any = useState([]);
  const [customer, setCustomer]: any = useState([]);
  const [provider, setProvider]: any = useState([]);
  const [timeTaken, setTimeTaken]: any = useState();
  const [timeStart, setTimeStart]: any = useState();
  const [extraWork, setExtraWork]: any = useState(false);

  const [timer, setTimer] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoader(true);

    const prov = await getProviderById(state.id);
    if (prov !== undefined) {
      setProvider(prov);
      if (prov.avatar.length > 1) {
        setAvatar(MEDIA_URL + prov.avatar);
      }
    }
    if (prov.working_status === 'active') {
      setToggle(true);
    } else {
      setToggle(false);
    }

    const res = await getProviderIncomingRequests(state.id).finally(() =>
      setLoader(false),
    );
    if (res !== undefined) {
      setRequests(res);
    }
    const res1 = await getProviderInProgress(state.id);
    if (res1.id !== undefined) {
      setinProgressBooking(res1);
      const cus = await getCustomerById(res1.customer_id);
      if (cus !== undefined) {
        setCustomer(cus);
      }
      if (res1.verified === 'true') {
        setProviderArrived(true);
      } else {
        setWaitingProvider(true);
      }
    }
    const submission = await showBookingSubmissionByPIDnBID({
      booking_id: res1.id,
      provider_id: state.id,
    });
    //console.log(submission, 'Submission data');
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
    console.log(selectedRequest, 'selected');
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
    const notifications = generateAcceptRequestNotification({
      category_name: selectedRequest.category_name,
      services: selectedRequest.bookingServices,
      provider_name: provider.name,
    });
    const n1data = {
      provider_id: state.id,
      customer_id: selectedRequest.customer_id,
      booking_id: selectedRequest.booking_id,
      description: notifications.customer,
      status: 'unread',
    };
    const n2data = {
      provider_id: state.id,
      customer_id: selectedRequest.customer_id,
      booking_id: selectedRequest.booking_id,
      description: notifications.provider,
      status: 'unread',
    };
    await generateCustomerNotification(n1data);
    await generateProviderNotification(n2data);
  }

  async function onCodeSubmit() {
    if (inProgressBooking.verification_code === verificationCode) {
      console.log('code matched');
      const res = await verifyBooking(inProgressBooking.id);
      setPhoneVerificationModal(false);
      setProviderArrived(true);

      const notifications = generateOnCodeSubmitNotification({
        provider_name: provider.name,
        category_name: inProgressBooking.category_name,
        services: inProgressBooking.services,
      });
      const n1data = {
        provider_id: state.id,
        customer_id: selectedRequest.customer_id,
        booking_id: selectedRequest.booking_id,
        description: notifications.customer,
        status: 'unread',
      };
      const n2data = {
        provider_id: state.id,
        customer_id: selectedRequest.customer_id,
        booking_id: selectedRequest.booking_id,
        description: notifications.provider,
        status: 'unread',
      };
      const n1 = await generateCustomerNotification(n1data);
      const n2 = await generateProviderNotification(n2data);

      getData();
    } else {
      Alert.alert('Incorrect code');
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
    const notifications = generateBeforeWorkImageSubmitNotification({
      provider_name: provider.name,
      category_name: inProgressBooking.category_name,
      services: inProgressBooking.services,
    });
    const n1data = {
      provider_id: state.id,
      customer_id: selectedRequest.customer_id,
      booking_id: selectedRequest.booking_id,
      description: notifications.customer,
      status: 'unread',
    };
    const n2data = {
      provider_id: state.id,
      customer_id: selectedRequest.customer_id,
      booking_id: selectedRequest.booking_id,
      description: notifications.provider,
      status: 'unread',
    };
    await generateCustomerNotification(n1data);
    await generateProviderNotification(n2data);
    // if (res.id !== undefined) {
    setBeforeModel(false);
    setStartWorking(true);
    setTimer(true);
    // }
  }
  async function onAfterImageSubmit(image: any) {
    //console.log(image, 'Image data');
    const data = {
      provider_id: state.id,
      booking_id: inProgressBooking.id,
      //before_work_image: image.data,
      after_work_image: image.sourceURL,
      time_taken: timeTaken,
    };
    const res = await updateBookingSubmission(inProgressBooking.id, data);
    console.log(res);
    const notifications = generateAfterWorkImageSubmitNotification({
      provider_name: provider.name,
      category_name: inProgressBooking.category_name,
      services: inProgressBooking.services,
    });
    const n1data = {
      provider_id: state.id,
      customer_id: selectedRequest.customer_id,
      booking_id: selectedRequest.booking_id,
      description: notifications.customer,
      status: 'unread',
    };
    const n2data = {
      provider_id: state.id,
      customer_id: selectedRequest.customer_id,
      booking_id: selectedRequest.booking_id,
      description: notifications.provider,
      status: 'unread',
    };
    await generateCustomerNotification(n1data);
    await generateProviderNotification(n2data);
    // if (res.id !== undefined) {
    setAfterModel(false);
    setExtraWork(true);
    // setStartWorking(true);
    // setTimer(true);
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
      const notifications = generatePauseBookingNotification({
        provider_name: provider.name,
        category_name: inProgressBooking.category_name,
        services: inProgressBooking.services,
      });
      const n1data = {
        provider_id: state.id,
        customer_id: selectedRequest.customer_id,
        booking_id: selectedRequest.booking_id,
        description: notifications.customer,
        status: 'unread',
      };
      const n2data = {
        provider_id: state.id,
        customer_id: selectedRequest.customer_id,
        booking_id: selectedRequest.booking_id,
        description: notifications.provider,
        status: 'unread',
      };
      await generateCustomerNotification(n1data);
      await generateProviderNotification(n2data);
      // setStartWorking(true);
    }
    //console.log(image, 'Image data');

    // }
  }
  async function onCompleteWork() {
    saveProgress(false);
    setStartWorking(false);
    setAfterModel(true);
  }
  async function onSubmitExtraCharge(amount?: any, desc?: string) {
    console.log(amount, desc);
    const data = {
      provider_id: state.id,
      customer_id: inProgressBooking.customer_id,
      booking_id: inProgressBooking.id,
      extra_work: desc ?? 'none',
      extra_work_charges: amount ?? 'none',
      amount: '12',
      total_amount: '12',
    };
    const res = await generateInvoice(data).finally(() => {
      setExtraWork(false);
    });
    //console.log(res, 'Invoice');
    const data1 = {
      booking_id: inProgressBooking.id,
      status: 'completed',
    };
    const res1 = await updateBooking(inProgressBooking.id, data1);
    const notifications = generatePauseBookingNotification({
      provider_name: provider.name,
      category_name: inProgressBooking.category_name,
      services: inProgressBooking.services,
    });
    const n1data = {
      provider_id: state.id,
      customer_id: selectedRequest.customer_id,
      booking_id: selectedRequest.booking_id,
      description: notifications.customer,
      status: 'unread',
    };
    const n2data = {
      provider_id: state.id,
      customer_id: selectedRequest.customer_id,
      booking_id: selectedRequest.booking_id,
      description: notifications.provider,
      status: 'unread',
    };
    await generateCustomerNotification(n1data);
    await generateProviderNotification(n2data);
    //console.log(res1, 'update');
  }
  async function onToggleStatus(status: boolean) {
    setToggle(status);
    var ws = 'inactive';
    if (status) {
      ws = 'active';
    }
    const data = {
      working_status: ws,
    };
    const tg = await updateProvider(state.id, data);
  }

  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <View style={[GlobalStyles.row, GlobalStyles.subView, {marginTop: 50}]}>
        <View style={[GlobalStyles.row, {width: '45%'}]}>
          <Avatar customSize size={50} source={avatar && {uri: avatar}} />
          <View style={{height: '90%', alignSelf: 'center'}}>
            <Text style={styles.gm}>{generateGreetings()}</Text>
            <Text style={styles.name}>{provider.name}</Text>
          </View>
        </View>
        <View style={[GlobalStyles.row, {width: '30%'}]}>
          <Text style={styles.gm}>
            {toggle && 'Online'}
            {!toggle && 'Offline'}
          </Text>
          <CustomSwitch
            isOn={toggle}
            onToggle={() => onToggleStatus(!toggle)}
          />
        </View>
      </View>
      {loader && <ActivityIndicator color={COLORS.MAIN_1} />}
      <View style={[GlobalStyles.subView, {marginTop: 30}]}>
        <PageNameText style={{marginBottom: 20}}>
          Incoming Requests
        </PageNameText>
        <FlatList data={requests} renderItem={renderIncoming} />
        {requests.length < 1 && (
          <FieldNameText style={{alignSelf: 'center'}}>
            No new requests
          </FieldNameText>
        )}
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
        customer={customer}
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
      <AfterWorkImage
        modalVisibility={afterModel}
        onSubmitPress={onAfterImageSubmit}
      />
      <ExtraCharge
        modalVisibility={extraWork}
        onSubmitNow={onSubmitExtraCharge}
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
        onCompleteWork={onCompleteWork}
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
