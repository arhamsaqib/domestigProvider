import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {showBookingSubmissionByPIDnBID} from '../../../api/bookingSubmission';
import {getCustomerById} from '../../../api/customer';
import {viewInvoiceByBookingId} from '../../../api/invoice';
import {saveCustomerReview} from '../../../api/rating';
import {GlobalStyles} from '../../../common/styles';
import {Avatar} from '../../../components/avatar';
import {BackIcon} from '../../../components/backIcon';
import {BottomCard} from '../../../components/bottomCard';
import {MyButton} from '../../../components/button';
import {GreenCircle} from '../../../components/greenCircle';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {ICONS} from '../../../constants/icons';
import {ScrollableView} from '../../../helpers/scrollableView';
import {GiveReview} from '../home/components/giveReview';
import {ProviderDetails} from './provider/providerDetails';

export const HistoryDetails = ({navigation, route}: any) => {
  const [card, setCard] = useState(false);
  const details = route.params.details;
  const [laoder, setLoader] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [customer, setCustomer]: any = useState([]);
  const [submission, setSubmission]: any = useState([]);
  const [invoice, setInvoice]: any = useState([]);

  async function getData() {
    setLoader(true);
    const res = await getCustomerById(details.customer_id).finally(() =>
      setLoader(false),
    );
    const sub = await showBookingSubmissionByPIDnBID({
      booking_id: details.id,
      provider_id: details.provider_id,
    });
    const inv = await viewInvoiceByBookingId(details.id);
    if (res !== undefined) {
      setCustomer(res);
    }
    if (sub !== undefined) {
      setSubmission(sub);
    }
    if (inv !== undefined) {
      setInvoice(inv);
    }
    //console.log(res, 'provider');
  }
  async function onRatingSubmit(rating: string, stars: any) {
    const data = {
      booking_id: details.id,
      provider_id: details.provider_id,
      customer_id: details.customer_id,
      review: rating,
      stars: stars,
    };
    const res = await saveCustomerReview(data).finally(() => {
      setRatingModal(false);
    });
    console.log(res, 'Review');
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <ProviderDetails
        modalVisibility={card}
        onOutsidePress={() => setCard(false)}
        data={customer}
      />
      <ScrollableView>
        <View style={styles.topRow}>
          <View style={{width: '15%', alignItems: 'flex-start'}}>
            <BackIcon black onPress={() => navigation.goBack()} />
          </View>
          <View
            style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
            <PageNameText>Booking History</PageNameText>
          </View>
        </View>
        <View style={styles.categoryNameContainer}>
          <GreenCircle broom s41 />
          <Text style={[styles.name, {marginLeft: 5, width: '70%'}]}>
            {/* {Service Category Name} */}
            {details.category_name + ' (' + details.services + ')'}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>Booking ID</Text>
            <Text style={styles.value}>#{details.id}</Text>
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>Status</Text>
            <Text style={styles.value}>{details.status}</Text>
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <Text style={[styles.value]}>{customer.location}</Text>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={styles.head}>Client details</Text>
        </View>
        <View style={styles.pDetailsContainer}>
          <View style={styles.avatrNameCont}>
            <Avatar
              customSize
              size={41}
              onPress={() => setCard(true)}
              pressable
            />
            <Text style={[styles.name, {marginLeft: 5}]}>{customer.name}</Text>
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.valueBold}>24</Text>
            <Text style={styles.value}>/h</Text>
          </View> */}
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              Before work image
            </Text>
            <Image source={ICONS.noimage} style={styles.img} />
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              After work image
            </Text>
            <Image source={ICONS.noimage} style={styles.img} />
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 20}}>
          <Text style={styles.head}>Invoice</Text>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              Service start time
            </Text>
            <Text style={styles.value}>10:35 AM</Text>
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              Service end time
            </Text>
            <Text style={styles.value}>02:25 PM</Text>
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>
            Total Serving Time
          </Text>
          <Text style={[styles.value]}>{submission.time_taken}</Text>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={[styles.name, {fontSize: 13}]}>Total Amount</Text>
          <Text style={[styles.name, {fontSize: 13}]}>
            ${invoice.total_amount}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[styles.name, {fontSize: 13}]}>Extra work charge</Text>
          <Text style={[styles.name, {fontSize: 13}]}>
            ${invoice.extra_work_charges}
          </Text>
        </View>
        <GiveReview
          modalVisibility={ratingModal}
          onOutisdePress={() => setRatingModal(false)}
          customerData={customer}
          onSubmitPress={onRatingSubmit}
        />
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={[styles.name, {fontSize: 13}]}>Amount</Text>
          <Text style={[styles.name, {fontSize: 13}]}>${invoice.amount}</Text>
        </View>
        <View style={{width: '90%', marginVertical: 20}}>
          <MyButton title="Leave Review" onPress={() => setRatingModal(true)} />
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
});
