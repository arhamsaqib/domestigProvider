import React from 'react';
import {View} from 'react-native';
import {GlobalStyles} from '../../../../common/styles';
import {Avatar} from '../../../../components/avatar';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {MEDIA_URL} from '../../../../constants/url';

interface Props {
  name?: string;
  data?: any;
}

export const ProfileOverview = (props: Props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Avatar
        customSize
        size={35}
        source={props.data.avatar && {uri: MEDIA_URL + props.data.avatar}}
      />
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginLeft: 10,
        }}>
        <FieldNameText>{props.name ?? 'Name'}</FieldNameText>
      </View>
    </View>
  );
};
