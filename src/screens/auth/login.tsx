import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {BottomSheet} from '../../components/bottomSheet';
import {PageNameText} from '../../components/texts/pageNameText';
import {GradientWrapper} from '../../helpers/gradientWrapper';

export const Login = ({navigation}: any) => {
  return (
    <GradientWrapper>
      <SafeAreaView style={styles.heading}>
        <PageNameText style={{marginVertical: 20}} white>
          Getting Started
        </PageNameText>
      </SafeAreaView>
      <BottomSheet style={{marginTop: '5%'}}></BottomSheet>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    width: '90%',
    //margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
