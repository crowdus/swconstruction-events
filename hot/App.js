import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import Feed from './components/pages/feed.js';
import TagButton from './components/renderables/tagButton.js';
import TagView from './components/pages/tagView.js';

/* FOLLOWING PAGE */
import TagsFollowing from './components/pages/tagsFollowing.js';
import UsersFollowing from './components/pages/usersFollowing.js';

/* TODO: TOO MANY FILES! 

These can all be like a feed showing file 
*/
import AdminEvents from './components/pages/adminEvents.js';
import UpcomingEvents from './components/pages/upcomingEvents.js';
import PastEvents from './components/pages/pastEvents.js';

import EventView from './components/pages/eventView.js';
import CreateEvent from './components/pages/createEvent.js';
/* CREATE AND EDIT EVENT CAN BE SAME FILE TOO */

import LogIn from './components/pages/login.js';
import Settings from './components/pages/settings.js'
import Registration from './components/pages/registration.js'
import UserView from './components/pages/userView.js'
import Search from './components/pages/searchView.js'

import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MapFeed from './components/pages/mapFeed'
import React, { Component } from 'react';
import EditEvent from './components/pages/editEvent'
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
  MapFeed: { screen: MapFeed },
  // UserFeed: { screen: UserFeed },
  // UserView: { screen: UserView },

  // invisible
  Event: { screen: EventView },
  TagView: { screen: TagView },
  TagButton: { screen: TagButton },
  Registration: { screen: Registration },
  EditEvent: {screen: EditEvent},
});

export const AppNav = createAppContainer(MainNavigator);
export default AppNav;

