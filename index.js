/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import Pusher from 'pusher-js/react-native';

// // Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

// var pusher = new Pusher('2798c1d46310fda66488', {
//   cluster: 'us2',
// });

// var channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function (data) {
//   alert(JSON.stringify(data));
// });

AppRegistry.registerComponent(appName, () => App);
