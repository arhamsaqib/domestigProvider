import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../../../common/styles';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {Review} from '../../history/provider/components/review';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {RootStateOrAny, useSelector} from 'react-redux';
import {ProviderReview} from './components/providerReview';
import {getProviderReviews} from '../../../../api/providerReview';

export const Reviews = () => {
  const [reviews, setReviews]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    const res = await getProviderReviews(state.id);
    if (res !== undefined) {
      setReviews(res);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  function renderReviews({item}: any) {
    return <ProviderReview item={item} />;
  }
  return (
    <View style={GlobalStyles.screenMain}>
      <View style={[{width: '90%', marginTop: 20}, styles.row]}>
        <Text style={styles.name}>All Reviews</Text>
        <Icon name="filter-outline" size={15} onPress={() => {}} />
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <FlatList data={reviews} renderItem={renderReviews} inverted />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  row: {
    //width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
