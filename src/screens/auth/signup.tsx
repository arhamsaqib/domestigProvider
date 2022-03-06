import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {BottomSheet} from '../../components/bottomSheet';
import {MyTextInputWithIcon} from '../../components/textinputwithicon';
import {FieldNameText} from '../../components/texts/fieldNameText';
import {PageNameText} from '../../components/texts/pageNameText';
import {TitleText} from '../../components/texts/titleText';
import {GradientWrapper} from '../../helpers/gradientWrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import {MyButton} from '../../components/button';
import {CheckBox} from '../../components/checkbox';
import {MainBodyText} from '../../components/texts/mainBodyText';
import {Divider} from '../../components/divider';
import {ScrollableView} from '../../helpers/scrollableView';
import {CheckSameString} from '../../helpers/checkSameString';
import auth from '@react-native-firebase/auth';
import {createProvider} from '../../api/provider';
import updateCurrentUserAction from '../../redux/action/currectUserAction';
import {useStore} from 'react-redux';

export const Signup = ({navigation}: any) => {
  const [name, setName]: any = useState('');
  const [email, setEmail]: any = useState('');
  const [phone, setPhone]: any = useState('');
  const [country, setCountry]: any = useState('');
  const [location, setLocation]: any = useState('');
  const [password, setPassword]: any = useState('');
  const [error, setError]: any = useState('');
  const [loader, setLoader] = useState(false);
  const [confirmPassword, setConfirmPassword]: any = useState('');
  const store = useStore();

  function disabled() {
    return (
      email.length < 8 ||
      password.length < 8 ||
      confirmPassword.length < 8 ||
      name.length < 2
    );
  }
  async function createLaravelUser(uid: string) {
    const data = {
      name: name,
      email: email,
      fuid: uid,
      status: 'active',
      location: location,
      latitude: '',
      longitude: '',
      phone: phone,
      country: country,
    };
    const user = await createProvider(data).finally(() => {
      setLoader(false);
    });
    console.log(user, 'New User');

    if (user.id !== undefined) {
      store.dispatch(
        updateCurrentUserAction({
          id: user.id,
        }),
      );
      navigation.navigate('bottomNav');

      //   Toast.show({
      //     type: 'success',
      //     text1: 'Registration',
      //     text2: 'Account created successfully 👋',
      //   });
    }
  }
  async function onRegister() {
    setLoader(true);
    setError('');
    if (CheckSameString(password, confirmPassword)) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const uid = userCredential.user.uid;
          createLaravelUser(uid);
        })
        .catch((error: any) => {
          if (error.code === 'auth/email-already-in-use') {
            setLoader(false);
            setError('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            setLoader(false);
            setError('That email address is invalid!');
          }
          //console.error(error);
        });
    } else {
      setLoader(false);
      setError('Passwords do not match');
    }
  }
  return (
    <>
      <GradientWrapper>
        <SafeAreaView style={styles.heading}>
          <PageNameText style={{marginVertical: 20}} white>
            Getting Started
          </PageNameText>
        </SafeAreaView>
        <BottomSheet style={{marginTop: '5%'}}>
          <ScrollableView>
            <View style={{width: '90%', marginVertical: 20}}>
              <TitleText>Sign up with</TitleText>
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Name</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter your name"
                autoCapitalize="none"
                onChangeText={setName}
                icon={
                  <Icon
                    name="person-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Email</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter your email"
                onChangeText={setEmail}
                autoCapitalize="none"
                icon={
                  <Icon
                    name="mail-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Phone</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter your phone"
                onChangeText={setPhone}
                icon={
                  <Icon
                    name="call-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Password</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter your password"
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry
                icon={
                  <Icon
                    name="lock-closed-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>
                Confirm Password
              </FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter confirm password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={setConfirmPassword}
                icon={
                  <Icon
                    name="lock-closed-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Country</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Select your country"
                onChangeText={setCountry}
                autoCapitalize="none"
                icon={
                  <Icon
                    name="globe-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Location</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter your location"
                onChangeText={setLocation}
                icon={
                  <Icon
                    name="location-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>

            <View style={{width: '90%', marginBottom: 300}}>
              <MyButton
                title="Sign up now"
                onPress={onRegister}
                loading={loader}
                disabled={loader || disabled()}
              />
            </View>
            {/* <View style={[CommonStyles.row, CommonStyles.subView]}>
              <DividerP style={{width: '30%'}} />
              <FieldNameText>Or Sign in with</FieldNameText>
              <DividerP style={{width: '30%'}} />
            </View> */}
          </ScrollableView>
        </BottomSheet>
      </GradientWrapper>
      {/* <View
        style={[CommonStyles.bottom5p, {width: '90%', alignItems: 'center'}]}>
        <FieldNameText>
          Don't have an account?{' '}
          <FieldNameText
            onPress={() => {}}
            style={{color: COLORS.MAIN_1, fontWeight: 'bold'}}>
            Sign up
          </FieldNameText>
        </FieldNameText>
      </View> */}
    </>
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
