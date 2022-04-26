import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {MyTextInputWithIcon} from '../../../../components/textinputwithicon';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropDown} from '../../../../components/dropdown';
import {MyButton} from '../../../../components/button';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {GlobalStyles} from '../../../../common/styles';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getProviderById, updateProvider} from '../../../../api/provider';
import ImageCropPicker from 'react-native-image-crop-picker';
import {uploadImage} from '../../../../api/uploadImage';
import {
  getProviderGallery,
  saveProviderGalleryImage,
} from '../../../../api/providergallery';
import {MEDIA_URL} from '../../../../constants/url';
import {FlatList} from 'react-native-gesture-handler';
import {CountriesOptions} from '../../../../components/countriesOptions';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {MultipleOptions} from '../../../../components/multipleOptions';
import {
  findPlaceById,
  findPlaceByText,
  placeAutocomplete,
} from '../../../../api/places';

export const ProfileDetails = () => {
  const [user, setUser]: any = useState([]);
  const [gallery, setGallery]: any = useState([]);
  const [fileUri, setFileUri]: any = useState(null);
  const [loader, setLoader]: any = useState(null);
  const [place, setPlace]: any = useState('');
  const [placeIinfo, setPlaceInfo]: any = useState([]);
  const [showPlaces, setShowPlaces] = useState(false);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [showCountries, setShowCountries] = useState(false);
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
    let result: any = await ImageCropPicker.openPicker({
      compressImageQuality: 0.5,
    });
    // console.log(result, 'Image picked');
    if (!result.cancelled) {
      setFileUri(result.path.toString());
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
  async function findLocation(str: string) {
    const res = await placeAutocomplete(str);
    setPlace(res);
  }

  async function findPlace(place: string) {
    const res = await findPlaceById(place);
    console.log(res, 'Place by text');

    setPlaceInfo(res.result);
  }
  function onSelect(item: any) {
    //console.log(item, 'Selected Item');
    setLocation(item.place_id);
    setShowPlaces(false);
    findPlace(item.description);
  }
  async function onSavePress() {
    setLoader(true);
    const data = {
      location: location,
      latitude: placeIinfo.geometry.location.lat,
      longitude: placeIinfo.geometry.location.lng,
      country: country,
      phone: phone,
    };
    const res = await updateProvider(user.id, data).finally(() =>
      setLoader(false),
    );
    console.log(res, 'update');
    getData();
  }
  return (
    <View style={[GlobalStyles.screenMain]}>
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
          onChangeText={setPhone}
          defaultValue={phone.length > 1 ? phone : user.phone}
          icon={<Icon name="call-outline" size={15} color={'#777777'} />}
        />
      </View>
      <View style={{width: '90%', marginBottom: 20}}>
        <FieldNameText style={{marginBottom: 5}}>Country</FieldNameText>
        <MyTextInputWithIcon
          placeholder="Select your country"
          onChangeText={setCountry}
          defaultValue={country.length > 1 ? country : user.country}
          onFocus={() => setShowCountries(true)}
          autoCapitalize="none"
          icon={
            <Icon name="globe-outline" size={16} color={COLORS.MAIN_BODYTEXT} />
          }
        />
        {showCountries && (
          <CountriesOptions
            onSelect={(item: any) => {
              setCountry(item.name);
              setShowCountries(false);
            }}
            find={country}
          />
        )}
      </View>
      <View style={{width: '90%', marginBottom: 20}}>
        <FieldNameText style={{marginBottom: 5}}>Location</FieldNameText>
        <MyTextInputWithIcon
          onFocus={() => setShowPlaces(true)}
          placeholder="Enter your location"
          defaultValue={location.length > 1 ? location : user.location}
          onChangeText={findLocation}
          //value={location}
          icon={
            <Icon
              name="location-outline"
              size={16}
              color={COLORS.MAIN_BODYTEXT}
            />
          }
        />
        {showPlaces && (
          <MultipleOptions data={place.predictions} onSelect={onSelect} />
        )}
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
            scrollEnabled={false}
          />
        </View>
      </View>
      <View style={{width: '90%', marginTop: 20}}>
        <MyButton title="Save changes" onPress={onSavePress} loading={loader} />
      </View>
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
