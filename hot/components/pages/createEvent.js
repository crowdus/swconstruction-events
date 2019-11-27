import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView} from 'react-native';
import t from 'tcomb-form-native';
import Event, { get_loc_from_addr } from '../classes/event.js'
import Geocoder from 'react-native-geocoding';
import {
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons'
import { globVars } from '../classes/core.js';

export const BASE_URL = 'https://hot-backend.herokuapp.com'
export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

/* Create Form Structure for the form builder library*/
const Form = t.form.Form;

const event = t.struct({
  name: t.String,
  desc: t.String,
  addr: t.String,
  start_date: t.Date,
  end_date: t.Date,
  tags: t.maybe(t.String),
  admins: t.maybe(t.String)
});

/* Set Form Placeholders and input validation settings */
const currTime = new Date()
var options = {
  fields: {
    name: {
      placeholder: 'Hot Chocolate Study Break',
      label: 'Event Name',
      maxLength: 128
    },
    desc: {
      label: 'Event Description',
      placeholder: 'Meet us over Hot Cocoa!',
      maxLength: 1000,
      multiline: true
    },
    addr: {
      label: 'Address',
      placeholder: "123 Main Street",
      maxLength: 500,
      multiline: true,
      numberOfLines: 2
    },
    start_date: {
      initialDate: currTime,
      minimumDate: currTime,
      minuteInterval: 10,
    },
    end_date: {
      minimumDate: currTime,
      minuteInterval: 10,
    },
    tags: {
      placeholder: "study,chocolate,..."
    },
    admins: {
      placeholder: "user1,user2,..."
    }
  }
};

function add_event_to_database(event,cb){
  fetch(`${BASE_URL}/events`, {
    method: 'POST',
    headers: fetch_headers,
    body: JSON.stringify(event)
  })
  .then((response) => response.text())
  .then((responseVal) => {
    cb(responseVal)
  })
  .catch((error) => {
    cb(0)
  });   
}


function parse_tags(tag_str){
  x = new Set()
  if (tag_str != null && tag_str != "") {
      tagArray = tag_str.split(/[ ,]+/)
      for (var tag of tagArray) {
          x.add(tag.toLowerCase()) /* TODO: make these sets instead of arrays */
      }
  }
  return Array.from(x)
}

function parse_admins(admin_str, username){
  x = new Set()
  x.add(username)
  if (admin_str != null && admin_str != "") {
      adArray = admin_str.split(/[ ,]+/)
      for (var ad of adArray) {
          x.add(ad.toLowerCase()) /* TODO: make these sets instead of arrays */
      }
  }
  return Array.from(x)
}

export default class CreateEvent extends React.Component {
  constructor(props){
    super(props)
    this.onPress = this.onPress.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    return {
        drawerLabel: () => "Create Event",
    }
};

    /* onForm Submit function */
  onPress = (usr) => {
    var value = this.refs.form.getValue();
    if (value) { 
      var validEvent = new Event(null, 
                            value.name,
                            value.desc,
                            new Date(value.start_date),
                            new Date(value.end_date),
                            value.addr,
                            parse_tags(value.tags),
                            parse_admins(value.admins, usr.getUserName()),
                            false)
      if (!validEvent.is_null_event()) {
        // Address Validity - Get latitude longitude points
        get_loc_from_addr(value.addr, validEvent, (loc) => {
          // Loc is valid
          if (loc != null) {
            add_event_to_database(validEvent, (resp) => {
              if (resp != 0) {
                validEvent.set_eventID(resp)
                console.log(`switched to events screen for ${resp}`)
                this.props.navigation.navigate('Event', {evt: validEvent, usr: usr})
              }
              else {
                Alert.alert('Server Error: Try Again Later!')
              }         
            })
          }
          else {
            Alert.alert('Form Error: Invalid Address')
          }
        })
      }
      else {
        // Invalid Event Object
        Alert.alert('Form Error: Invalid Start and End Date')
      }
    }
    else{
      // Invalid Form
      Alert.alert('Form Error: Missing Fields')
    }
  }

  render() {
    var usr = globVars.user
    
    return (
      <View style={styles.container}>
        <View style={{padding:10, flexDirection: 'row'}}>
          <Icon
              name='three-bars'
              size={30}
              color='#222'
              onPress={() => this.props.navigation.toggleDrawer()}
          />
          <Text style={{fontSize: 32, alignSelf: 'center', marginTop: -5}}>   Create Event</Text>
        </View>
        <ScrollView>
        <Form
          ref="form"
          type={event}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={() => {this.onPress(usr)}} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableHighlight>

        <Text onPress={this.onPress}>
          {this.props.formStatus}
        </Text>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
