import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import Feed from './components/pages/feed.js';
import UserFeed from './components/pages/userFeed.js';
import LogIn from './components/pages/login.js';
import CreateEvent from './components/pages/createEvent.js';
import EventView from './components/pages/eventView.js';
import Settings from './components/pages/settings.js'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

Geocoder.init(APIKEY, {language : "en"});

const MainNavigator = createStackNavigator({
  // Home: { screen: Home },
  LogIn: { screen: LogIn },
  Feed: { screen: Feed },
  UserFeed: { screen: UserFeed },
  Event: { screen: EventView },
  CreateEvent: { screen: CreateEvent },
  Settings: { screen: Settings },
});

export const AppNav = createAppContainer(MainNavigator);

export default AppNav;
