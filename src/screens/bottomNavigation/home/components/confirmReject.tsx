import React from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {StyleSheet, View, Text} from 'react-native';
import {MyButton} from '../../../../components/button';

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  onYesPress?(): void;
  onNoPress?(): void;
}

export const ConfirmRejectRequest = (props: Props) => {
  return (
    <BottomCard
      style={{height: '25%', alignItems: 'center'}}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutisdePress}>
      <PageNameText style={{marginVertical: 10}}>
        Are you sure you want to reject?
      </PageNameText>

      <View style={styles.btnRow}>
        <View style={{width: '45%'}}>
          <MyButton secondary title="No" onPress={props.onNoPress} />
        </View>
        <View style={{width: '45%'}}>
          <MyButton title="yes" onPress={props.onYesPress} />
        </View>
      </View>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    //marginBottom: '10%',
  },
});
