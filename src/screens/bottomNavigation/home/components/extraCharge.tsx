import React, {useState} from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {StyleSheet, View, Text} from 'react-native';
import {MyButton} from '../../../../components/button';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {MyTextInput} from '../../../../components/textinput';
import {MyTextInputWithIcon} from '../../../../components/textinputwithicon';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../../constants/colors';

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  onSubmitNow(amount: string, desc: string): void;
  onNoPress?(): void;
}

export const ExtraCharge = (props: Props) => {
  const [extra, setExtra] = useState(false);
  const [extraWorkDone, setExtraWorkDone]: any = useState('');
  const [extraWorkAmount, setExtraWorkAmount]: any = useState(false);
  return (
    <BottomCard
      style={[
        {minHeight: '30%', alignItems: 'center'},
        extra && {height: '50%'},
      ]}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutisdePress}>
      {!extra && (
        <>
          <PageNameText style={{marginVertical: 10}}>
            Is there any extra charge?
          </PageNameText>

          <View style={styles.btnRow}>
            <View style={{width: '45%'}}>
              <MyButton secondary title="No" onPress={props.onNoPress} />
            </View>
            <View style={{width: '45%'}}>
              <MyButton title="yes" onPress={() => setExtra(true)} />
            </View>
          </View>
        </>
      )}
      {extra && (
        <View style={{width: '90%', marginTop: 10}}>
          <PageNameText style={{marginVertical: 10, alignSelf: 'center'}}>
            Extra charge details
          </PageNameText>
          <FieldNameText style={{marginBottom: 5, fontSize: 14}}>
            Description
          </FieldNameText>
          <MyTextInput
            style={{borderRadius: 5, height: 127}}
            placeholder="Enter your details here"
            multiline
            onChangeText={setExtraWorkDone}
          />
          <FieldNameText style={{marginVertical: 5, fontSize: 14}}>
            Amount
          </FieldNameText>
          <MyTextInputWithIcon
            placeholder="Amount"
            icon={<Icon name="dollar" color={COLORS.MAIN_BODYTEXT} />}
            keyboardType="numeric"
            onChangeText={setExtraWorkAmount}
          />
          <View style={{marginTop: 30}}>
            <MyButton
              title="Submit Now"
              onPress={() => props.onSubmitNow(extraWorkAmount, extraWorkDone)}
            />
          </View>
        </View>
      )}
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
