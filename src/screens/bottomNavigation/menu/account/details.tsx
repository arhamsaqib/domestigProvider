import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {MyTextInputWithIcon} from '../../../../components/textinputwithicon';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropDown} from '../../../../components/dropdown';
import {MyButton} from '../../../../components/button';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {GlobalStyles} from '../../../../common/styles';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getProviderById} from '../../../../api/provider';
import ImageCropPicker from 'react-native-image-crop-picker';
import {uploadImage} from '../../../../api/uploadImage';
import {
  getProviderGallery,
  saveProviderGalleryImage,
} from '../../../../api/providergallery';
import {MEDIA_URL} from '../../../../constants/url';
import {FlatList} from 'react-native-gesture-handler';

export const ProfileDetails = () => {
  const [user, setUser]: any = useState([]);
  const [gallery, setGallery]: any = useState([]);
  const [fileUri, setFileUri]: any = useState(null);
  const [loader, setLoader]: any = useState(null);

  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    const res = await getProviderById(state.id);
    if (res !== undefined) {
      setUser(res);
    }
    const gal = await getProviderGallery(state.id);
    console.log(gal, 'gallery');
    if (gal !== undefined) {
      setGallery(gal);
    }
  }
  async function onImagePick() {
    let result: any = await ImageCropPicker.openPicker({});
    // console.log(result, 'Image picked');
    if (!result.cancelled) {
      setFileUri(result.sourceURL.toString());
    }
    setLoader(true);
    const res: any = await uploadImage(result);
    console.log(res, 'upload res 1');
    if (res.id !== undefined) {
      const data = {
        provider_id: state.id,
        image: res.uri,
      };
      const up = await saveProviderGalleryImage(data).finally(() =>
        setLoader(false),
      );
      if (up.id !== undefined) {
        getData();
      }
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function renderGallery({item}: any) {
    return (
      <Image
        source={{uri: MEDIA_URL + item.image}}
        resizeMode="contain"
        style={{height: 100, width: '32%', marginRight: '2%', marginBottom: 2}}
      />
    );
  }

  return (
    <View style={GlobalStyles.screenMain}>
      <ScrollableView>
        <View style={{width: '90%', marginTop: 20}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Name</Text>
          <MyTextInputWithIcon
            defaultValue={user.name}
            icon={<Icon name="person-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Email</Text>
          <MyTextInputWithIcon
            defaultValue={user.email}
            icon={<Icon name="mail-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Phone</Text>
          <MyTextInputWithIcon
            defaultValue={user.phone}
            icon={<Icon name="call-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Country</Text>
          <DropDown
            name={user.country ?? 'Select your country'}
            //value={user.country}
            icon={<Icon name="globe-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <DropDown
            name={user.location ?? 'Type your location'}
            icon={<Icon name="location-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Gallery</Text>
          <MyButton
            style={{height: 30, width: '40%'}}
            textStyle={{fontSize: 11}}
            secondary
            loading={loader}
            disabled={loader}
            title="Add new image"
            onPress={onImagePick}
          />
          <View style={{justifyContent: 'space-between'}}>
            <FlatList
              style={{marginVertical: 10}}
              data={gallery}
              numColumns={3}
              renderItem={renderGallery}
            />
          </View>
        </View>
        <View style={{width: '90%', marginTop: 20}}>
          <MyButton title="Save changes" />
        </View>
      </ScrollableView>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 14,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
});
