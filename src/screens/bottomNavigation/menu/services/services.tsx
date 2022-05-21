import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getAllCategories} from '../../../../api/categories';
import {saveProviderServices} from '../../../../api/providerServices';
import {GlobalStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {BottomCard} from '../../../../components/bottomCard';
import {MyButton} from '../../../../components/button';
import {Divider} from '../../../../components/divider';
import {GreenCircle} from '../../../../components/greenCircle';
import {MyTextInput} from '../../../../components/textinput';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {MainBodyText} from '../../../../components/texts/mainBodyText';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {ICONS} from '../../../../constants/icons';
import {arrayOfObjectsSearchWithId} from '../../../../helpers/arrayOfObjectsSearch';
import {extractKeys, joinArrayKeys} from '../../../../helpers/extractKeys';
import {removeItemOnce} from '../../../../helpers/removeItemFromArray';
import {PaymentCard} from './components/paymentCard';
import {ServicesCard} from './components/servicesCard';

export const Services = ({navigation}: any) => {
  const [categories, setCategories]: any = useState([]);
  const [selectedCategory, setSelectedCategory]: any = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected]: any = useState([]);
  const [rate, setRate]: any = useState('');

  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    setLoader(true);
    const res = await getAllCategories().finally(() => setLoader(false));
    if (res !== undefined) [setCategories(res)];
  }
  function renderServices({item}: any) {
    return (
      <PaymentCard
        name={item.categoryName}
        onEditPress={() => {
          setSelectedCategory(item);
          setShowModal(true);
        }}
      />
    );
  }
  useEffect(() => {
    getData();
  }, []);

  function onServicePress(item: any) {
    //console.log(item, 'item');
    if (arrayOfObjectsSearchWithId(item.id, selected)) {
      var res = removeItemOnce(item, selected);
      setSelected(res);
    } else {
      setSelected([...selected, item]);
    }
  }

  function renderSubServices({item}: any) {
    return (
      <ServicesCard name={item.name} onPress={() => onServicePress(item)} />
    );
  }

  async function onSavePress() {
    //console.log(selected);
    const separate = extractKeys(selected);
    setLoader(true);
    const data = {
      provider_id: state.id,
      services: separate,
      category_name: selectedCategory.categoryName,
      status: 'active',
      rate: rate,
    };
    const res = await saveProviderServices(data).finally(() =>
      setLoader(false),
    );
    setShowModal(false);
    setRate('');
    setSelectedCategory([]);
    setSelected([]);
    console.log(res);
  }

  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <View style={styles.topRow}>
        <View style={{width: '15%', alignItems: 'flex-start'}}>
          <BackIcon black onPress={() => navigation.goBack()} />
        </View>
        <View style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
          <PageNameText>Services</PageNameText>
        </View>
      </View>
      {loader && <ActivityIndicator color={COLORS.MAIN_1} />}
      <View style={{width: '90%', marginTop: 10}}>
        <FlatList data={categories} renderItem={renderServices} />
      </View>
      <BottomCard
        style={{height: '80%'}}
        modalVisibility={showModal}
        onOutsidePress={() => setShowModal(false)}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <GreenCircle s50>
            <Image source={ICONS.broom} style={{height: 19.83, width: 13.88}} />
          </GreenCircle>
          <MainBodyText style={{fontSize: 13, color: COLORS.MAIN_TEXT}}>
            Select the services that you want to provide
          </MainBodyText>
          <Divider />
          <View style={{width: '90%', marginTop: 10}}>
            <FieldNameText style={{marginBottom: 3}}>
              Set your hourly rate
            </FieldNameText>
            <MyTextInput keyboardType={'numeric'} onChangeText={setRate} />
            <FieldNameText style={{marginVertical: 3}}>
              Select your services
            </FieldNameText>
            <FlatList
              data={selectedCategory.services}
              renderItem={renderSubServices}
            />
            <MyButton
              title={'Save now'}
              loading={loader}
              onPress={onSavePress}
            />
          </View>
        </View>
      </BottomCard>
    </SafeAreaView>
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
  bottom: {
    position: 'absolute',
    width: '90%',
    bottom: 10,
  },
});
