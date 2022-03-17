import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStateOrAny, useSelector} from 'react-redux';
import {showProviderServicesByCategoryName} from '../../../../../api/providerServices';
import {CustomSwitch} from '../../../../../components/customSwitch';
import {GreenCircle} from '../../../../../components/greenCircle';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';

interface Props {
  icon?: any;
  name?: string;
  editable?: boolean;
  showTiming?: boolean;
  onEditPress?(): void;
}

export const PaymentCard = (props: Props) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [data, setData]: any = useState([]);
  async function getData() {
    const d = {
      category_name: props.name,
      provider_id: state.id,
    };
    const res = await showProviderServicesByCategoryName(d);
    if (res !== undefined) {
      setData(res);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.row1}>
        <GreenCircle s41>
          <Image source={ICONS.broom} style={{height: 19.83, width: 13.88}} />
        </GreenCircle>
        <Text style={styles.name}>{props.name ?? 'Card'}</Text>
      </View>
      <View style={styles.row1}>
        {data.id !== undefined && (
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{data.rate}/h</Text>
          </View>
        )}
        <TouchableOpacity onPress={props.onEditPress}>
          <Image
            source={ICONS.pencil}
            style={[styles.pencil, {marginLeft: 5}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    //borderWidth: 1,
    backgroundColor: 'white',
    height: 71,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row1: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
    marginLeft: 10,
  },
  time: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: 'white',
  },
  pencil: {
    height: 15,
    width: 15,
  },
  timeContainer: {
    width: 51,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: COLORS.MAIN_1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
