import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import Feed from './components/pages/feed.js';
import TagButton from './components/renderables/tagButton.js';
import TagView from './components/pages/tagView.js';
import LogIn from './components/pages/login.js';
import CreateEvent from './components/pages/createEvent.js';
import TagsFollowing from './components/pages/tagsFollowing.js';
import UsersFollowing from './components/pages/usersFollowing.js';
import AdminEvents from './components/pages/adminEvents.js';
import UpcomingEvents from './components/pages/upcomingEvents.js';
import PastEvents from './components/pages/pastEvents.js';
import EventView from './components/pages/eventView.js';
import Settings from './components/pages/settings.js'
import Registration from './components/pages/registration.js'
import UserView from './components/pages/userView.js'

import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';


Geocoder.init(APIKEY, {language : "en"});

// My info
// explore
// create
// tags following
// users following
// Admin events
// upcoming events
// past events

const MainNavigator = createDrawerNavigator({
  LogIn: { screen: LogIn },

  Settings: { screen: Settings },
  Feed: { screen: Feed },
  CreateEvent: { screen: CreateEvent },
  TagsFollowing: { screen: TagsFollowing },
  UsersFollowing: { screen: UsersFollowing },
  AdminEvents: { screen: AdminEvents },
  UpcomingEvents: { screen: UpcomingEvents },
  PastEvents: { screen: PastEvents },
  // UserFeed: { screen: UserFeed },
  // UserView: { screen: UserView },

  // invisible
  Event: { screen: EventView },
  TagView: { screen: TagView },
  TagButton: { screen: TagButton },
  Registration: { screen: Registration },
});

export const AppNav = createAppContainer(MainNavigator);

export default AppNav;
