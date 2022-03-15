import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../../../common/styles';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ScrollableView} from '../../../../helpers/scrollableView';

export const ProviderProfileDetails = ({route}: any) => {
  // console.log(route.params, 'Params');
  const user = route.params.user;
  var desc =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  return (
    <View style={GlobalStyles.screenMain}>
      <ScrollableView>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Email</Text>
          <Text style={styles.val}>{user.email}</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Phone</Text>
          <Text style={styles.val}>{user.phone}</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Country</Text>
          <Text style={styles.val}>{user.country}</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <Text style={styles.val}>{user.location}</Text>
        </View>
      </ScrollableView>
    </View>
  );
};
const styles = StyleSheet.create({
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
  val: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  container: {
    marginVertical: 10,
    width: '90%',
  },
});
