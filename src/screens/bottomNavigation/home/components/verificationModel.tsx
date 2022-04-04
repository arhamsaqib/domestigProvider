import React, {useState} from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {MyButton} from '../../../../components/button';
import {MyTextInput} from '../../../../components/textinput';

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  onSubmitPress?(): void;
  setVerificationCode?(num: string): void;
}

export const PhoneVerificationModel = (props: Props) => {
  return (
    <BottomCard
      style={{height: '30%', alignItems: 'center'}}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutisdePress}>
      <PageNameText style={{marginVertical: 10}}>
        Enter the verification from client
      </PageNameText>
      <View style={styles.codeRow}>
        <MyTextInput
          style={styles.ti}
          maxLength={4}
          keyboardType="numeric"
          onChangeText={props.setVerificationCode}
        />
      </View>
      <View style={styles.btnRow}>
        <MyButton title="Submit Now" onPress={props.onSubmitPress} />
      </View>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  btnRow: {
    width: '90%',
    marginTop: 20,
    //marginBottom: '10%',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  ti: {
    // width: '20%',
    borderRadius: 3,
  },
});
