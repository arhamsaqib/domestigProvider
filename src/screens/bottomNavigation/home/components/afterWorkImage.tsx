import React, {useState} from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MyButton} from '../../../../components/button';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../constants/colors';
import {FieldNameText} from '../../../../components/texts/fieldNameText';

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  onSubmitPress(image: any): void;
}

export const AfterWorkImage = (props: Props) => {
  const [image, setImage]: any = useState([]);
  async function openGallery() {
    ImagePicker.openPicker({
      mediaType: 'photo',
      //includeBase64: true,
    }).then(image => {
      console.log(image);
      setImage(image);
    });
  }
  return (
    <BottomCard
      style={{height: '35%', alignItems: 'center'}}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutisdePress}>
      <PageNameText style={{marginVertical: 10}}>
        Submit After Work Image
      </PageNameText>
      <TouchableOpacity onPress={openGallery} style={styles.imageCont}>
        {!image.path && (
          <>
            <Icon name="add-outline" color={COLORS.MAIN_BODYTEXT} size={20} />
            <FieldNameText>Upload New</FieldNameText>
          </>
        )}
        {image.path && (
          <Image
            source={{uri: image.path}}
            style={{height: 80, width: 131, borderRadius: 3}}
          />
        )}
      </TouchableOpacity>
      <View style={styles.btnRow}>
        <MyButton
          title="Submit Now"
          onPress={() => props.onSubmitPress(image)}
        />
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
  imageCont: {
    backgroundColor: '#E4E4E4',
    height: 80,
    width: 131,
    borderRadius: 3,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ti: {
    // width: '20%',
    borderRadius: 3,
  },
});
