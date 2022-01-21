import React from 'react';
import {LogBox} from 'react-native';
import {DomestigProvider} from './src/screens/main/domestig';

const App = () => {
  LogBox.ignoreAllLogs();
  return <DomestigProvider />;
};

export default App;
