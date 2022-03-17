import React from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {MainBodyText} from '../../../../components/texts/mainBodyText';
import {COLORS} from '../../../../constants/colors';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {GreenCircle} from '../../../../components/greenCircle';
import {StyleSheet, View, Text} from 'react-native';
import {FONTS} from '../../../../constants/fonts';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {MyButton} from '../../../../components/button';

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  data?: any;
  onAcceptPress?(): void;
  onRejectPress?(): void;
}

export const IncomingRequest = (props: Props) => {
  const children = ({remainingTime}: any) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <MainBodyText style={{color: COLORS.MAIN_1}}>
        {minutes}:{seconds}
      </MainBodyText>
    );
  };
  return (
    <BottomCard
      style={{height: '80%', alignItems: 'center'}}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutisdePress}>
      <ScrollableView>
        <CountdownCircleTimer
          isPlaying
          duration={3600}
          //@ts-ignore
          colors={[COLORS.light_green]}
          size={90}
          //@ts-ignore
          trailColor={COLORS.MAIN_1}
          strokeWidth={5}
          colorsTime={[7, 5, 2, 0]}>
          {children}
        </CountdownCircleTimer>
        <PageNameText style={{marginVertical: 10}}>
          Incoming Service Request
        </PageNameText>
        <View style={styles.categoryNameContainer}>
          <GreenCircle broom s41 />
          <Text style={[styles.name, {marginLeft: 10, width: '80%'}]}>
            {props.data.category_name +
              ' (' +
              props.data.bookingServices +
              ' )'}
          </Text>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <Text style={[styles.value]}>Lorem Ipsum is simply dummy text</Text>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>
            Selected Services
          </Text>
          <Text style={[styles.value]}>{props.data.bookingServices}</Text>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Instructions</Text>
          <Text style={[styles.value]}>{props.data.instructions}</Text>
        </View>
      </ScrollableView>
      <View style={styles.btnRow}>
        <View style={{width: '45%'}}>
          <MyButton secondary title="Reject" onPress={props.onRejectPress} />
        </View>
        <View style={{width: '45%'}}>
          <MyButton title="Accept" onPress={props.onAcceptPress} />
        </View>
      </View>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    marginBottom: 20,
  },
  categoryNameContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 16,
    color: COLORS.WF_TITLE,
  },
  head: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 18,
    color: COLORS.WF_TITLE,
  },
  value: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  valueBold: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
  pDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  avatrNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 80,
    width: '100%',
  },
  btnRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 20,
    marginBottom: '10%',
  },
});
