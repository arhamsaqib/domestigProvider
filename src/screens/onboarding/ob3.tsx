import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {GlobalStyles} from '../../common/styles';
import {MyButton} from '../../components/button';
import {PageIndicator} from '../../components/pageIndicator';
import {MainBodyText} from '../../components/texts/mainBodyText';
import {TitleText} from '../../components/texts/titleText';
import {ICONS} from '../../constants/icons';

export const Onboarding3 = ({navigation}: any) => {
  function onNextPress() {
    navigation.navigate('ob3');
  }
  return (
    <ImageBackground source={ICONS.onboarding3} style={styles.main}>
      <View style={styles.titleCont}>
        <TitleText style={{textAlign: 'center'}}>
          This is the main title
        </TitleText>
      </View>
      <View style={styles.subtitleCont}>
        <MainBodyText style={{textAlign: 'center'}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </MainBodyText>
      </View>
      <View style={styles.indicator}>
        <PageIndicator page={3} />
      </View>
      <View style={[GlobalStyles.bottom5p, GlobalStyles.subView]}>
        <MyButton title="Get Started" onPress={onNextPress} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  titleCont: {
    width: '90%',
    position: 'absolute',
    top: '60%',
  },
  subtitleCont: {
    width: '80%',
    position: 'absolute',
    top: '65%',
  },
  indicator: {
    width: '80%',
    position: 'absolute',
    top: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
