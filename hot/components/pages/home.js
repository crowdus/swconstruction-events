// Useless file for now

/*
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, TouchableOpacity} from 'react-native';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event';
import EventCard from '../renderables/eventcard'


// the class that renders the keys.
export default class Feed extends Component {

  constructor(props) {
      super(props)
      this.props = props
      this.state = {
        screen: 'Explore'
      }
  }

  // navigation options displayed at the top of the screen
  static navigationOptions = ({navigation}) => {
      return {
      headerLeft: () =>  (       
          <Button
              onPress={() => alert('Iter2: Take me to settings, lists of events im going/interested/admin, following lists')}
              title="My profile"
              color="#000"
          />
      ),
      headerTitle: () => (
          <Button
              onPress={() => alert('Iter2: Take me to list of events I\'m interested in, going to, or an admin of')}
              title="Explore"
              color="#000"
          />
      ),
      headerRight: () => (
          <Button
              onPress={() => navigation.navigate('CreateEvent', {usr: navigation.getParam('usr')})}
              title="Create event"
              color="#000"
          />
      ),
    };
  };

  render() {
    const {navigate} = this.props.navigation;
    
    return(

        
    )
  }
}
*/
