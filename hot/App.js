import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import { Feed, AdminEvents, UpcomingEvents } from './components/pages/feed.js';
import TagButton from './components/renderables/tagButton.js';
import TagView from './components/pages/tagView.js';

/* FOLLOWING PAGE */
import TagsFollowing from './components/pages/tagsFollowing.js';
import UsersFollowing from './components/pages/usersFollowing.js';

import EventView from './components/pages/eventView.js';
import CreateEvent from './components/pages/createEvent.js';
/* CREATE AND EDIT EVENT CAN BE SAME FILE TOO */

import LogIn from './components/pages/login.js';
import Settings from './components/pages/settings.js'
import Registration from './components/pages/registration.js'
import UserView from './components/pages/userView.js'
import Search from './components/pages/searchView.js'
import EditUser from './components/pages/editUser.js'
import ProfileView from './components/pages/profileview.js'

import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import MapFeed from './components/pages/mapFeed'
import React, { Component } from 'react';
import EditEvent from './components/pages/editEvent'
import ViewListUsers from './components/pages/viewListUsers'
import Icon from 'react-native-vector-icons/Octicons'
import { Text, View, SafeAreaView, Header, Button, TouchableOpacity} from 'react-native';
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
import { HeaderBackButton } from 'react-navigation-stack';
const evtNavigator = createStackNavigator({
    Feed: { screen: Feed,
        navigationOptions: ({navigation}) => ({
            headerLeft: <View style={{paddingLeft: 10, flexDirection: 'row'}}><Icon name='three-bars' size={26} color='#222' onPress={() => navigation.toggleDrawer()} style={{alignSelf: 'center', marginTop: -5}} /><Text style={{fontSize: 26, alignSelf: 'center', marginTop: -5}}>   Explore</Text></View>,
            drawerLabel: () => "Explore",
        }),
    },
    Event2: { 
        screen: EventView,
        navigationOptions: ({navigation}) => ({
            headerLeft: <HeaderBackButton onPress={()=>navigation.goBack(null)} />,
            drawerLabel: () => null
        }),
    },
    TagView: { 
        screen: TagView,
        navigationOptions: ({navigation}) => ({
            headerLeft: <HeaderBackButton onPress={()=>navigation.goBack(null)} />,
            drawerLabel: () => null
        }),
    },
    ViewListUsers: {screen: ViewListUsers,
        navigationOptions: ({navigation}) => ({
            headerLeft: <HeaderBackButton onPress={()=>navigation.goBack(null)} />,
            drawerLabel: () => null
        }),
    },
    UserView: { screen: ProfileView },
    FriendView: { screen: UserView },
}); 

const regNavigator = createStackNavigator({
  Registration: { 
      screen: Registration,
      navigationOptions: ({navigation}) => ({
        drawerLockMode: 'locked-closed',
        drawerLabel: () => null,
        headerLeft: <HeaderBackButton onPress={()=>navigation.navigate('LogIn')} />,
      }),
  },
});

const MainNavigator = createDrawerNavigator({
  LogIn: { 
      screen: LogIn,
      navigationOptions: ({navigation}) => ({
        drawerLockMode: 'locked-closed',
        drawerLabel: () => null,
      }),
  },
  Settings: { screen: EditUser },
  Search: { screen: Search },
  Feed: { screen: evtNavigator,
      navigationOptions: ({navigation}) => ({
            drawerLabel: () => "Explore",
      }),
  },
  CreateEvent: { screen: CreateEvent },
  TagsFollowing: { screen: TagsFollowing },
  UsersFollowing: { screen: UsersFollowing },
  AdminEvents: { screen: AdminEvents,  
      navigationOptions: ({navigation}) => ({
            drawerLabel: () => "Admin Events",
      }),
  },
  UpcomingEvents: { screen: UpcomingEvents,
      navigationOptions: ({navigation}) => ({
            drawerLabel: () => "Upcoming Events",
      }),
  },
  MapFeed: { screen: MapFeed },
  
  UsersFollowing: {screen: UsersFollowing},

  // invisible
  TagButton: { screen: TagButton, navigationOptions: {drawerLabel: () => null}},
  EditEvent: {screen: EditEvent, navigationOptions: {drawerLabel: () => null}},
  regNav: {screen: regNavigator, navigationOptions: {drawerLabel: () => null}},
});


export const AppNav = createAppContainer(MainNavigator);
export default AppNav;

