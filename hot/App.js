import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Event from './components/classes/event.js';
import Home from './components/pages/home.js';
import LogIn from './components/pages/login.js';
import CreateEvent from './components/pages/createEvent.js';




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Current: 'Home',
      reset: false,
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        {this.state.Current == 'Login' ? <LogIn></LogIn> : <CreateEvent></CreateEvent> }
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