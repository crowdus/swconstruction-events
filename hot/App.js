import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Geocoder from 'react-native-geocoding';

const APIKEY = 'AIzaSyB9z1Rab2_34wUVl177HhwEAGa4nh2SnSk'

import Event from './components/classes/event';
import Home from './components/pages/home.js';
import LogIn from './components/pages/login.js';
import CreateEvent from './components/pages/createEvent.js';
import EventView from './components/pages/eventView.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Current: 'Home',
      reset: false,
    };
    Geocoder.init(APIKEY, {language : "en"});
  }

  render() {
    var values = {
      name: "HotChoc",
      desc: "Study Break",
      start_date: new Date(),
      end_date: new Date("01 Jun 2019 00:00:00 GMT"),
      address: "123 Main St"
    }
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        {this.state.Current == 'Login' ? <LogIn></LogIn> : <EventView></EventView> }
      </View>
    );
  }
}


/*
  render() {
    return (
      <View style={styles.container}>
        {this.state.Current == 'Home'
          ? <Home reset={this.state.reset} />
          : <List reset={this.state.reset} />}

        <BottomNavigation>
          <BottomNavigation.Action
            key="home"
            iconSet="SimpleLineIcons"
            icon={<SimpleLineIcons name="home" size={25} color="red" />}
            label="Home"
            onPress={() => this.changeReset('Home')}
          />

          <BottomNavigation.Action
            key="list"
            icon={<SimpleLineIcons name="list" size={25} />}
            label="List"
            onPress={() => this.changeReset('List')}
          />

        </BottomNavigation>
      
}

/*
this.name = name
this.desc = desc
this.start_date = start_date
this.end_date = end_date
this.address = address
this.tags = tags
this.isBoosted = false
this.admins = admin
*/