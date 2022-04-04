import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BottomCard} from '../../../../../components/bottomCard';
import {GreenCircle} from '../../../../../components/greenCircle';
import {MyTextInput} from '../../../../../components/textinput';
import {MyTextInputWithIcon} from '../../../../../components/textinputwithicon';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyButton} from '../../../../../components/button';
import {DropDown} from '../../../../../components/dropdown';
import {Divider} from '../../../../../components/divider';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FieldNameText} from '../../../../../components/texts/fieldNameText';
import {ScrollableView} from '../../../../../helpers/scrollableView';

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  onSavePress?(data?: any): void;
  loader?: boolean;
}

export const AddDocumentModal = (props: Props) => {
  const [selected, setSelected] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [image, setImage]: any = useState([]);
  async function openGallery() {
    ImagePicker.openPicker({
      mediaType: 'photo',
      // includeBase64: true,
    }).then(image => {
      //console.log(image);
      setImage(image);
    });
  }
  const options = [
    {
      name: 'National ID',
    },
    {
      name: 'Driving License',
    },
    {
      name: 'Passport',
    },
  ];
  function disabled() {
    return fieldName.length < 8 || image.length < 8 || selected.length < 1;
  }
  return (
    <BottomCard
      modalVisibility={props.modalVisibility}
      style={{height: '60%'}}
      onOutsidePress={props.onOutsidePress}>
      <ScrollableView>
        <View style={{width: '100%', alignItems: 'center'}}>
          <GreenCircle>
            <Image source={ICONS.attachment} style={styles.icon} />
          </GreenCircle>
          <Text style={[styles.title, {marginTop: 5}]}>
            Edit details and submit for verification
          </Text>
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
          <Text style={[styles.field, {marginBottom: 5}]}>
            Select ID option
          </Text>
          <DropDown
            cardStyle={{
              maxWidth: 150,
              height: 130,
              alignSelf: 'flex-start',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            name={selected ?? 'Select ID'}>
            {options.map((item: any) => {
              return (
                <>
                  <Text
                    onPress={() => setSelected(item.name)}
                    style={styles.opt}>
                    {item.name}
                  </Text>
                  <Divider />
                </>
              );
            })}
          </DropDown>
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Field Name</Text>
          <MyTextInput onChangeText={setFieldName} />
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={[styles.field, {marginBottom: 5}]}>
            Upload {selected}
          </Text>
          <TouchableOpacity onPress={openGallery} style={styles.imageCont}>
            {!image.sourceURL && (
              <>
                <Icon
                  name="add-outline"
                  color={COLORS.MAIN_BODYTEXT}
                  size={20}
                />
                <FieldNameText>Upload New</FieldNameText>
              </>
            )}
            {image.sourceURL && (
              <Image
                source={{uri: image.sourceURL}}
                style={{height: 80, width: 131, borderRadius: 3}}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
          <MyButton
            title="Save Now"
            loading={props.loader}
            disabled={disabled()}
            onPress={() =>
              props.onSavePress &&
              props.onSavePress({field: fieldName, image: image, id: selected})
            }
          />
        </View>
      </ScrollableView>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 26.97,
    width: 21.95,
  },
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 14,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
  opt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: 'black',
  },
  imageCont: {
    backgroundColor: '#E4E4E4',
    height: 80,
    width: 131,
    borderRadius: 3,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
