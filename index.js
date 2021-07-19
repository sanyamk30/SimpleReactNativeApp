/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
// import {AppRegistry} from 'react-native';
import App from './App';
import InfoDetailCard from './components/InfoDetailCard';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent('App', () => App);
Navigation.registerComponent('UserProfile', () => InfoDetailCard);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'App',
            },
          },
        ],
      },
    },
  });
});
App.options = {
  topBar: {
    title: {
      text: 'Home',
      color: 'white',
    },
    background: {
      color: '#841584',
    },
  },
};
