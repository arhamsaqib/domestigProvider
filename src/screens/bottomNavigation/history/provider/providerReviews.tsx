import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {Review} from './components/review';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../../../../common/styles';
import {getCustomerReviews} from '../../../../api/rating';

export const ProviderReviews = ({route}: any) => {
  const [review, setReviews]: any = useState([]);
  const [loader, setLoader]: any = useState(false);
  async function getData() {
    const user = route.params.user;
    setLoader(true);
    const res = await getCustomerReviews(user.id).finally(() =>
      setLoader(false),
    );
    if (res !== undefined) {
      setReviews(res);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const renderReviews = ({item}: any) => {
    return <Review item={item} />;
  };

  return (
    <View style={GlobalStyles.screenMain}>
      <View style={{width: '90%', marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.title, {marginBottom: 10}]}>All Reviews</Text>
          <Icon name="filter-outline" size={15} onPress={() => {}} />
        </View>
        {loader && <ActivityIndicator color={COLORS.MAIN_1} />}
        <FlatList data={review} renderItem={renderReviews} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
});
