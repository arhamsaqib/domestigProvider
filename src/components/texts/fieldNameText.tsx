import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';

interface Props extends TextProps {}

export const FieldNameText = (props: Props) => {
  const {style, children} = props;
  return <Text style={[styles.main, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  main: {
    fontSize: 14,
    fontFamily: FONTS.P_Light,
    color: COLORS.MAIN_BODYTEXT,
  },
});
