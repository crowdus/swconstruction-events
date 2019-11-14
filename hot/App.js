import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import Feed from './components/pages/feed.js';
import Event from './components/classes/event';
import Home from './components/pages/home.js';
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
  Event: { screen: Event },
});

export const AppNav = createAppContainer(MainNavigator);

export default AppNav;

