import React from 'react';
import {LogBox} from 'react-native';
import {allReducers} from './src/redux/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {DomestigProvider} from './src/screens/main/domestig';

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <DomestigProvider />
      </PersistGate>
    </Provider>
  );
};

export default App;
