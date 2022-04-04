import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from '../../../../../components/avatar';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {MEDIA_URL} from '../../../../../constants/url';
import moment from 'moment';

interface Props {
  item?: any;
}

export const Review = (props: Props) => {
  //console.log(props.item);
  const dt = new Date(props.item.created_at);

  var desc =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. galley of type and scrambled it to make a type specimen book.';
  return (
    <View style={styles.main}>
      <View style={styles.avatarCont}>
        <Avatar
          customSize
          size={41}
          source={
            props.item.provider_avatar && {
              uri: MEDIA_URL + props.item.provider_avatar,
            }
          }
        />
      </View>
      <View style={styles.col}>
        <Text style={[styles.name, {marginBottom: 5}]}>
          {props.item.provider_name}
        </Text>
        <Text style={[styles.desc, {marginBottom: 5}]}>
          {props.item.review ?? desc}
        </Text>
        <Text style={[styles.time, {marginBottom: 5}]}>
          {moment
            .utc(dt.toLocaleDateString())
            .local()
            .startOf('seconds')
            .fromNow()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  col: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '85%',
  },
  avatarCont: {
    width: '13%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  time: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 11,
    color: COLORS.WF_TITLE,
    opacity: 0.4,
  },
  desc: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: COLORS.WF_TITLE,
    opacity: 0.6,
  },
});
