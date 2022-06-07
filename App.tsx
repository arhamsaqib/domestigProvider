import React from 'react';
import {LogBox} from 'react-native';
import {allReducers} from './src/redux/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {DomestigProvider} from './src/screens/main/domestig';
import {SplashWhite} from './src/screens/splash/splashWhite';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  const persistedReducer = persistReducer(persistConfig, allReducers);
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return (
    <StripeProvider publishableKey="pk_test_51L2bzJDPoMFOHLWbhgF0tfmfKrn614J8cidmL2DeSkgr7iRIfZAhrp4SisyZ5udaVpNtNOLcLSq7Vt5CeKpEyw0900kBzcRlKD">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<SplashWhite />}>
          <DomestigProvider />
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

export default App;
