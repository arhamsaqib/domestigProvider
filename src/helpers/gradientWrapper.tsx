import React from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/colors';

interface Props {
  children?: any;
  style?: StyleProp<ViewStyle>;
}
//@ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

export const GradientWrapper = (props: Props) => {
  const {children, style} = props;
  return (
    <LinearGradient
      colors={[COLORS.MAIN_1, COLORS.WHITE]}
      style={[styles.main, props.style]}>
      <KeyboardAwareScrollView
        enableOnAndroid
        style={{width: '100%', alignSelf: 'center', borderWidth: 1, flex: 0.8}}>
        <View style={{width: '100%', alignItems: 'center'}}>{children}</View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
