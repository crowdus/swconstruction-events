import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import Feed from './components/pages/feed.js';
import TagButton from './components/renderables/tagButton.js';
import TagView from './components/pages/tagView.js';

import TagsFollowing from './components/pages/tagsFollowing.js';
import UsersFollowing from './components/pages/usersFollowing.js';

import AdminEvents from './components/pages/adminEvents.js';
import UpcomingEvents from './components/pages/upcomingEvents.js';
import PastEvents from './components/pages/pastEvents.js';
import EventView from './components/pages/eventView.js';
import CreateEvent from './components/pages/createEvent.js';

import LogIn from './components/pages/login.js';
import Settings from './components/pages/settings.js'
import Registration from './components/pages/registration.js'
import UserView from './components/pages/userView.js'
import EditEvent from './components/pages/editEvent.js'
import Search from './components/pages/searchView.js'

import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React, { Component } from 'react';
// import { createStore, combineReducers } from 'redux';

// let store = createStore(combineReducers({ count: counter }));


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
  Search: { screen: Search },
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
  UserView: { screen: UserView },
  EditEvent: { screen: EditEvent },
});

export const AppNav = createAppContainer(MainNavigator);
export default AppNav;

// const Navigation = createAppContainer(MainNavigator);

// // Render the app container component with the provider around it
// export default class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.props.glob = 'asdf'
//   }

//   render() {
//     return (
//       <Navigation />
//     );
//   }
// }
