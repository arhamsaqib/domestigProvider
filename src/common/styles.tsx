import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const GlobalStyles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 20,
  },
  bottom5p: {
    position: 'absolute',
    bottom: '5%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subView: {
    width: '90%',
  },
  screenMain: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
});
