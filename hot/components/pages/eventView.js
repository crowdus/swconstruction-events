import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView, SafeAreaView, FlatList} from 'react-native';
import {
  Button,
  Alert,
} from 'react-native';
import User from '../classes/user.js';
import TagButton from '../renderables/tagButton'
import Icon from 'react-native-vector-icons/Octicons'
import Event from '../classes/event.js';
import { globVars } from '../classes/core.js';
import {NavigationEvents} from "react-navigation";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const BASE_URL = 'https://hot-backend.herokuapp.com'
export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

/* Helper function to render tags and admins */
function renderArray(arr){
  var retArr = []
  if (arr.length == 0) {
    retArr.push(<Text> None </Text>)
  }
  else {
    for (let i in arr) {
      retArr.push(<TagButton t={arr[i]}></TagButton>)
    }
  }
  return retArr
}

function edit_database_event(event,cb){
  fetch(`${BASE_URL}/events`, {
    method: 'PUT',
    headers: fetch_headers,
    body: JSON.stringify(event)
  })
  .then((response) => response.text())
  .then((responseVal) => {
    cb(responseVal)
  })
  .catch((error) => {
    console.error(error)
    cb(0)
  });   
}

export default class EventView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      'interested_people': [],
      'interested_friends': [],
      'going_people': [],
      'going_friends': [],
      'eventUserID': '',
      'userStatus': '',
      'loc': null,
      'event': null
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert.alert("Permission to access location was denied")
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ loc: location });
  };

  static navigationOptions = {
    drawerLabel: () => null
  }

  onPress_boost = (e, usr) => {
    if (e.set_boost(usr)) {
      if (usr.setPoint(usr.getPoint() - globVars.points_to_boost)) {
        edit_database_event(e, (resp) => {
          if (resp != 0) {
            e.set_eventID(resp)
            this.props.navigation.navigate('Event', {evt: e, usr: usr})
          }       
        })
        Alert.alert("Event is boosted! -30 points")
      }
      else {
        Alert.alert(`Failed: Boosts cost 30 points. You currently have ${usr.getPoint()} points.`)
      }
    }
  }

  onPress_status = (e, status, usr) => {
    e.add_follower(usr, status, (eventuserid) => {
      this.getAttendeeStatus(e, usr)
      var pts = e.get_points()
      Alert.alert(`Marked as ${status}. You've earned ${pts}!`)
    })
  }

  onPress_viewUsers = (status) => {
    var userList = []
    if (status == 'Going') {
      userList = this.state.interested_people
    }
    if (status == 'Interested'){
      userList = this.state.going_people
    }
  }

  boost_display = (e, usr) => {
    current_username = usr.getUserName()
    current_is_admin = e.get_admins().includes(current_username)
    if (e.is_boosted()) {
      return (
        <View>
          <Text style={{fontSize: 20, color: "Red", textAlign: "center"}}>
            This event is Boosted!
          </Text>
        </View>
      )
    }
    else if (current_is_admin) {
      return (
        <View>
          <TouchableHighlight style={styles.button} onPress={() => {this.onPress_boost(e, usr)}} underlayColor='#99d9f4'>
            <Text>Boost this event!</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  edit_display = (e, usr) => {
    current_username = usr.getUserName()
    current_is_admin = e.get_admins().includes(current_username)
    if (current_is_admin) {
      return (
        <View>
          <TouchableHighlight style={styles.button} onPress={() => {this.props.navigation.navigate('EditEvent', {evt: e, usr: usr})}} underlayColor='#99d9f4'>
            <Text>Edit Event</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  getUpdatedEvent(id){
    fetch(`${BASE_URL}/events/${id}`, {
      method: 'GET',
      headers: fetch_headers,
    })
    .then((response) => response.json())
    .then((i) => {
      var x = new Event(i['_id'], i['name'], i['desc'], i['start_date'], i['end_date'], i['addr'], i['tags'], i['admins'], i['loc'], i['isBoosted'], i['hot_level'])
      this.setState({event: x})
    })
    .catch((error) => {
      //console.error(error)
    });  
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    if (typeof lat1 === 'undefined' || typeof lon1 === 'undefined' ||
        typeof lat2 === 'undefined' || typeof lon2 === 'undefined') {
      return Infinity;
    }
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  locCheck(e) {
    console.log("helloooo")
    console.log(e)
    lat1 = e.get_lat()
    long1 = e.get_long()
    lat2 = this.state.loc['coords']['latitude']
    long2 = this.state.loc['coords']['longitude']
    dist = this.getDistanceFromLatLonInKm(lat1, long1, lat2, long2)
    console.log("DISTANCE:")
    console.log(lat1)
    console.log(lat2)
    console.log(long1)
    console.log(long2)
    return (dist < 0.1)
  }

  getAttendeeStatus(e, usr) {
    e.get_status_people("interested", (l) => {
      this.setState({interested_people:l})
    })
    e.get_status_people("going", (l) => {
      if (l) {
        this.setState({going_people:l})
      }
    })
    
    e.get_status_friends(usr, "interested", (l) => {
      if (l) {
        this.setState({interested_friends:l})
      }
    })
    e.get_status_friends(usr, "going", (l) => {
      if (l) {
        this.setState({going_friends:l})
      }
    })
    usr.get_status_for_event(e, (userEventObj) => {
      if (userEventObj){
        this.setState({userStatus:userEventObj['status']})
        this.setState({eventUserID:userEventObj['_id']})
      }
    }) 
  }

  componentDidMount() {
    console.log("update")
    var e = this.props.navigation.getParam('evt')
    var usr = globVars.user
    
    // Make API call
    this.getAttendeeStatus(e, usr)
    this.getUpdatedEvent(e.get_eventID())
    this.getAttendeeStatus(e, usr)
    this._getLocationAsync();
  }

  render() {
    var e = this.props.navigation.getParam('evt')
    console.log("RENDERRR")
    console.log(e)
    var usr = globVars.user
    var renderTags = renderArray(e.get_tags())
    var renderAdmins = renderArray(e.get_admins())
    // var renderStatus = renderStatusButtons()

    var numFriendsInt = this.state.interested_friends.length
    var numFriendsGoing = this.state.going_friends.length
    var interested_str = (
      <Text> 
        {numFriendsInt} friends
        and {this.state.interested_people.length - numFriendsInt} other(s)
        marked 'Interested' 
    </Text>)

    var boost_disp = this.boost_display(e, usr)
    var edit_disp = this.edit_display(e, usr)

    var going_str = (
      <Text> 
        {numFriendsGoing} friends
        and {this.state.going_people.length - numFriendsGoing} other(s)
        marked 'Going' 
    </Text>)

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth:40, borderColor:"white"}}>
              <Icon
                name='three-bars'
                size={30}
                color='#222'
                onPress={() => this.props.navigation.toggleDrawer()}
                style={{marginRight: -20, alignSelf: "flex-start"}}
              />
        <NavigationEvents onDidFocus={()=>this.componentDidMount()}/>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text>
              <Text style={{fontSize: 50, fontStyle: "italic", fontWeight: "bold", textAlign: "center",}}>
              {e.get_name()}</Text>
              {"\n\n"}Where: 
              <Text style={{fontSize: 20,}}>{"\n"}{e.get_address()}</Text>

              {"\n\n"}Description: 
              <Text style={{fontSize: 20,}}>{"\n"}{e.get_desc()}</Text>

              {"\n\n"}When: 
              <Text style={{fontSize: 20,}}>{"\n"}
              {e.get_start_date().toDateString()} ({e.get_start_date().toTimeString()})
              - 
              {e.get_end_date().toDateString()} ({e.get_end_date().toTimeString()})
              </Text>

            
              {"\n\n"} Tags: 
              </Text>
              {renderTags}

              <Text>{"\n\n"}</Text>
              {boost_disp}
            
              <Text>
              {"\n\n"}Hosted By: 
              </Text>
              {renderAdmins}

              <Text style={{textAlign: "center"}}> {"\n\n"}
              Attendees: 
              </Text>

              <TouchableHighlight onPress={() => this.onPress_viewUsers('interested')}>
                <Text>
                  Interested: {"\n"}
                  {interested_str}
                </Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => this.onPress_viewUsers('going')}>
                <Text>
                  Going: {"\n"}
                  {going_str}
                </Text>
              </TouchableHighlight>

            <Text>
              {"\n\n"}Respond: 
            </Text>
            <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
            <TouchableHighlight onPress={() => this.onPress_status(e, "going", usr)}>
              <Text style ={{backgroundColor:
                            this.state.userStatus === "going"
                              ? "#FCDC4D"
                              : "white"
                            }}>
                              <Text>Going</Text>
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.onPress_status(e, "interested", usr)}>
              <Text style ={{backgroundColor:
                            this.state.userStatus === "interested"
                              ? "#FCDC4D"
                              : "white"
                            }}>
                              <Text>interested</Text>
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.onPress_status(e, "declined", usr)}>
              <Text style ={{backgroundColor:
                            this.state.userStatus === "declined"
                              ? "#FCDC4D"
                              : "white"
                            }}>
                              <Text>Declined</Text>
              </Text>
            </TouchableHighlight>
            </View>
            <Text> {"\n"} </Text>
            <Button
              title="Explore More"
              color="#f194ff"
              onPress={() => this.props.navigation.navigate('Feed', {usr:usr})}
            />
            <Button
              title="Check In"
              color="#f194ff"
              onPress={() => {
                start = e.get_start_date()
                end = e.get_end_date()
                curr = new Date()
                if (!(start < curr && curr < end)){
                  Alert.alert("Event Not In Session")
                }
                else if (!this.locCheck(e)) {
                  Alert.alert("You are too far from the event")
                }
                else if (e.get_admins().includes(usr.getUserName())) {
                  Alert.alert("Admin can't check into own event")
                }
                else if (this.state.userStatus == "checkedIn") {
                  Alert.alert("You've already checked in!")
                }
                else{
                  this.onPress_status(e, "checkedIn", usr)
                }
              }}
            />
            <Text>{"\n\n\n"}</Text>
            {edit_disp}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tags_container: {
    flex: 1,
    padding:10
  },
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


