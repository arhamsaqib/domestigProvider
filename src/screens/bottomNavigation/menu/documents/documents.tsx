import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {
  getProviderDocuments,
  saveProviderDocument,
} from '../../../../api/providerDocuments';
import {uploadImage} from '../../../../api/uploadImage';
import {GlobalStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {MyButton} from '../../../../components/button';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {AddDocumentModal} from './components/addAddressCard';
import {AddressCard} from './components/addressCard';

export const Documents = ({navigation}: any) => {
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [docs, setDocs]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function onSavePress(data: any) {
    setLoader(true);
    const img: any = await uploadImage(data?.image);
    // console.log(img, 'Upload res');
    if (img.id !== undefined) {
      const datax = {
        provider_id: state.id,
        image: img.uri,
        name: data.field,
        idName: data?.id,
      };

      const res = await saveProviderDocument(datax).finally(() =>
        setLoader(false),
      );
      setShow(false);
      getData();
      // console.log(res, 'Doc res');
    }
  }

  async function getData() {
    setLoader(true);
    const res = await getProviderDocuments(state.id).finally(() =>
      setLoader(false),
    );
    if (res !== undefined) {
      setDocs(res);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function renderDocs({item}: any) {
    return <AddressCard name={item.name} idName={item.idName} />;
  }

  return (
    <SafeAreaView style={GlobalStyles.screenMain}>
      <View style={styles.topRow}>
        <View style={{width: '15%', alignItems: 'flex-start'}}>
          <BackIcon black onPress={() => navigation.goBack()} />
        </View>
        <View style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
          <PageNameText>Documents</PageNameText>
        </View>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <FlatList data={docs} renderItem={renderDocs} />
      </View>
      <AddDocumentModal
        modalVisibility={show}
        onOutsidePress={() => setShow(false)}
        onSavePress={onSavePress}
        loader={loader}
      />
      {/* <View style={styles.bottom}>
        <MyButton title="Add new address" onPress={() => setShow(true)} />
      </View> */}
      <View
        style={{width: '90%', marginTop: 10, position: 'absolute', bottom: 20}}>
        <MyButton title="Add new document" onPress={() => setShow(true)} />
      </View>
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
