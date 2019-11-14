import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import Feed from './components/pages/feed.js';
import User from './components/classes/user.js';
import LogIn from './components/pages/login.js';
import CreateEvent from './components/pages/createEvent.js';
import EventView from './components/pages/eventView.js';

// import AppNavigator from './AppNavigator';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

Geocoder.init(APIKEY, {language : "en"});

const MainNavigator = createStackNavigator({
  // Home: { screen: Home },
  LogIn: { screen: LogIn },
  Feed: { screen: Feed },
  Event: { screen: EventView },
  CreateEvent: { screen: CreateEvent },
});

export const AppNav = createAppContainer(MainNavigator);

export default AppNav;

export var userTA = new User("dadwdadadawd", "johndoe", "John", "Doe", "johndoe@email.com", new Date(), "password", ['am0002'])

