import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../../common/styles';
import {Avatar} from '../../../components/avatar';
import {CustomSwitch} from '../../../components/customSwitch';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';

export const Home = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <View style={[GlobalStyles.row, GlobalStyles.subView]}>
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
