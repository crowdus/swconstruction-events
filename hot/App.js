import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import Feed from './components/pages/feed.js';
import TagButton from './components/renderables/tagButton.js';
import TagView from './components/pages/tagView.js';
import UserFeed from './components/pages/userFeed.js';
import LogIn from './components/pages/login.js';
import CreateEvent from './components/pages/createEvent.js';
import EventView from './components/pages/eventView.js';
import Settings from './components/pages/settings.js'
import Registration from './components/pages/registration.js'
import UserView from './components/pages/userView.js'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


Geocoder.init(APIKEY, {language : "en"});

const drawer = createDrawerNavigator({
  Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
          usr: navigation.getParam('usr'),
      }),
      drawerLabel: 'Settings',
  }, Settings2: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
        usr: navigation.getParam('usr'),
    }),
    drawerLabel: 'Settings2',
  },
}, {});


const MainNavigator = createDrawerNavigator({
  LogIn: { screen: LogIn, drawerLabel: () => null },
  Feed: { screen: Feed },
  UserFeed: { screen: UserFeed },
  Event: { screen: EventView },
  CreateEvent: { screen: CreateEvent },
  TagView: { screen: TagView },
  TagButton: { screen: TagButton },
  Settings: { screen: Settings },
  Registration: { screen: Registration },
  UserView: { screen: UserView },
});

export const AppNav = createAppContainer(MainNavigator);

export default AppNav;
