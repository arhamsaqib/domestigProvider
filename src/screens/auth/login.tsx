import React, {useEffect, useState} from 'react';
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
import {GlobalStyles} from '../../common/styles';
import {CheckBox} from '../../components/checkbox';
import {MainBodyText} from '../../components/texts/mainBodyText';
import {Divider} from '../../components/divider';
import {RootStateOrAny, useSelector, useStore} from 'react-redux';
import updateCurrentUserAction from '../../redux/action/currectUserAction';
import {showProviderByFUID} from '../../api/provider';
import auth from '@react-native-firebase/auth';
import rememberMeAction from '../../redux/action/rememberMeAction';
import {THIS_VERSION} from '../../constants/version';
import {getLatestVersion} from '../../api/version';
//@ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-toast-message';

export const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [update, setUpdate] = useState(false);

  const store = useStore();
  const state = useSelector((state: RootStateOrAny) => state.rememberMe);
  function checkRememberMe() {
    if (state.rememberMe) {
      setEmail(state.email);
      setPassword(state.password);
      setRememberMe(state.rememberMe);
    }
  }

  async function appVersionCheck() {
    const res = await getLatestVersion();
    console.log(res, 'App Version');
    if (res.version !== undefined) {
      const latest = parseFloat(res.version);
      console.log(latest, 'Latest version');
      if (latest > THIS_VERSION) {
        setUpdate(true);
        //console.log('Update');
      } else {
        //console.log('Dont Update');
      }
    }
  }

  useEffect(() => {
    checkRememberMe();
    appVersionCheck();
  }, []);
  async function verifyLaravelUser(uid: any) {
    const user = await showProviderByFUID(uid);
    if (user.id !== undefined) {
      Toast.show({
        type: 'success',
        text1: 'Auth',
        text2: 'Logged in successfully',
      });
      store.dispatch(
        updateCurrentUserAction({
          id: user.id,
        }),
      );
      if (rememberMe) {
        store.dispatch(
          rememberMeAction({
            email: email,
            password: password,
            rememberMe: true,
          }),
        );
      } else {
        store.dispatch(
          rememberMeAction({
            email: '',
            password: '',
            rememberMe: false,
          }),
        );
      }
      navigation.navigate('bottomNav');

      // Toast.show({
      //   type: 'success',
      //   text1: 'Auth',
      //   text2: 'Logged in successfully 👋',
      // });
      // wait(3000).then(() => {
      //   navigation.navigate('Onboarding Stack');
      // });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Auth',
        text2: 'Proper user not found',
      });
    }
  }
  function disabled() {
    return email.length < 8 || password.length < 8;
  }
  async function onLogin() {
    // setError('');
    setLoader(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        setLoader(false);
        const uid = userCredential.user.uid;
        userCredential.user.sendEmailVerification();
        verifyLaravelUser(uid);
        //console.log('User account created & signed in!');
      })
      .catch((error: any) => {
        setLoader(false);

        if (error.code === 'auth/invalid-email') {
          // setError('The email address is invalid!');
          Toast.show({
            type: 'error',
            text1: 'Auth',
            text2: 'Invalid Email',
          });
        }

        if (error.code === 'auth/wrong-password') {
          Toast.show({
            type: 'error',
            text1: 'Auth',
            text2: 'Wrong Password',
          });
          //setError('Password is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          Toast.show({
            type: 'error',
            text1: 'Auth',
            text2: 'User not found',
          });
          //setError('Password is invalid!');
        }
        console.error(error);
      });
  }
  return (
    <>
      <GradientWrapper>
        <SafeAreaView style={styles.heading}>
          <PageNameText style={{marginVertical: 20}} white>
            Welcome Back
          </PageNameText>
          {update && (
            <FieldNameText
              style={{
                fontWeight: 'bold',
                color: 'yellow',
                //marginTop: 20,
              }}>
              A new update is available
            </FieldNameText>
          )}
        </SafeAreaView>
        <BottomSheet style={{marginTop: '5%', height: '100%'}}>
          <KeyboardAwareScrollView style={{width: '100%'}}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <View style={{width: '90%', marginVertical: 20}}>
                <TitleText>Login with</TitleText>
              </View>
              <View style={{width: '90%', marginBottom: 20}}>
                <FieldNameText style={{marginBottom: 5}}>Email</FieldNameText>
                <MyTextInputWithIcon
                  placeholder="Enter your mail"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
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
                <FieldNameText style={{marginBottom: 5}}>
                  Password
                </FieldNameText>
                <MyTextInputWithIcon
                  placeholder="Enter your password"
                  secureTextEntry
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  value={password}
                  icon={
                    <Icon
                      name="lock-closed-outline"
                      size={16}
                      color={COLORS.MAIN_BODYTEXT}
                    />
                  }
                />
              </View>
              <View
                style={[
                  GlobalStyles.subView,
                  GlobalStyles.row,
                  {marginBottom: 30},
                ]}>
                <View style={[GlobalStyles.row, {width: '40%'}]}>
                  <CheckBox value={rememberMe} onChangeVal={setRememberMe} />
                  <FieldNameText>Remember me</FieldNameText>
                </View>
                <MainBodyText
                  onPress={() => navigation.navigate('forget')}
                  style={{color: 'black'}}>
                  Forgot password!
                </MainBodyText>
              </View>
              <View style={{width: '90%', marginBottom: 20}}>
                <MyButton
                  title="Login Now"
                  onPress={onLogin}
                  loading={loader}
                  disabled={disabled() || loader}
                />
              </View>
              <View style={[GlobalStyles.row, GlobalStyles.subView]}>
                <Divider style={{width: '30%'}} />
                <FieldNameText>Or Sign in with</FieldNameText>
                <Divider style={{width: '30%'}} />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </BottomSheet>
      </GradientWrapper>
      <View
        style={[GlobalStyles.bottom5p, {width: '90%', alignItems: 'center'}]}>
        <FieldNameText>
          Don't have an account?{' '}
          <FieldNameText
            onPress={() => navigation.navigate('signup')}
            style={{color: COLORS.MAIN_1, fontWeight: 'bold'}}>
            Sign up
          </FieldNameText>
        </FieldNameText>
        <FieldNameText>v{THIS_VERSION} beta</FieldNameText>
      </View>
      <Toast position="bottom" />
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
