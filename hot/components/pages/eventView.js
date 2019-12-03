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
import MapView from "react-native-maps";
var dateFormat = require("dateformat")
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export const BASE_URL = 'https://hot-backend.herokuapp.com'
export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
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
    cb(0)
  });   
}

export default class EventView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      'interested_people': [],
      'interested_friends': [],
      'checkedin_friends': [],
      'checkedin_people': [],
      'going_people': [],
      'going_friends': [],
      'eventUserID': '',
      'userStatus': '',
      'loc': globVars.user.get_location(),
    }
  }

  /* Helper function to render admin */
  renderAdminArray(arr, e){
    var retStr = ""
    if (arr.length == 0) {
      return (<Text> No Admins </Text>)
    }
    else {
      for (let i in arr) {
        retStr += `@${arr[i]}`
        if (i < arr.length - 1){
          retStr += ", "
        }
      }
    }
  return (<Text> {retStr} </Text>)
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
            usr.boost_event(e)
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
      if (status == "checkedIn") {
        var pts = e.get_points()
        usr.addPoint(e)
        console.log("check in!")
        Alert.alert(`Marked as ${status}. You've earned +${pts}! You now have ${usr.get_points()} points`)
      }
    })
  }

  onPress_viewUsers = (e, status) => {
    console.log(`view ${status}`)
    e.get_status_people(status, (l) => {
      var userList = []
      for (i in l){
        var u = l[i]
        userList.push(new User(u['_id'], u['username'], u['firstname'], u['lastname'], u['email'], u['datejoined'], u['password'], u['point'], u['friends']))
      }
      this.props.navigation.navigate('ViewListUsers', {userList:userList})
    })
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
    lat1 = e.get_lat()
    long1 = e.get_long()
    lat2 = this.state.loc['coords']['latitude']
    long2 = this.state.loc['coords']['longitude']
    dist = this.getDistanceFromLatLonInKm(lat1, long1, lat2, long2)
    return (dist < 0.1)
  }

  getAttendeeStatus(e, usr) {
    
    e.get_status_people("interested", (l) => {
      if(l) {
        this.setState({interested_people:l})
      }
    })
    e.get_status_people("going", (l) => {
      if (l) {
        this.setState({going_people:l})
      }
    })
    
    e.get_status_people("checkedIn", (l) => {
      console.log(l)
      if (l) {
        
        this.setState({checkedin_people:l})
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
    
    e.get_status_friends(usr, "checkedIn", (l) => {
      if (l) {
        this.setState({checkedin_friends:l})
      }
    })
    usr.get_status_for_event(e, (userEventObj) => {
      if (userEventObj){
        this.setState({userStatus:userEventObj['status']})
        this.setState({eventUserID:userEventObj['_id']})
      }
      else{
        this.setState({userStatus:''})
        this.setState({eventUserID:''})
      }
    }) 
  }

  componentDidMount() {
    var e = this.props.navigation.getParam('evt')
    var usr = globVars.user
    
    // Make API call
    this.getAttendeeStatus(e, usr)
    this.getUpdatedEvent(e.get_eventID())
    this._getLocationAsync();
  }

  render() {
    var e = this.props.navigation.getParam('evt')
    var usr = globVars.user
    var renderAdmins = this.renderAdminArray(e.get_admins(), e)
    // var renderStatus = renderStatusButtons()

    var numFriendsInt = this.state.interested_friends.length
    var numFriendsGoing = this.state.going_friends.length
    var numFriendsCheckedIn = this.state.checkedin_friends.length

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

    var checkedIn_str = (
      <Text> 
        {numFriendsCheckedIn} friends
        and {this.state.checkedin_people.length - numFriendsCheckedIn} other(s)
        marked 'Checked In' 
    </Text>)

    return (
      <View style={{flex: 1}}>

        <View>

          <NavigationEvents onDidFocus={()=>this.componentDidMount()}/>
         
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{height:200, padding: 10}}>
                <MapView
                      style={styles.map}
                      region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                }}/>
                <Text style={{fontSize: 50, fontStyle: "italic", fontWeight: "bold", textAlign: "center", paddingTop: 20}}>
                {e.get_name()}</Text>
              </View>
              <View style={{paddingHorizontal: 40}}>
              <Text style={{fontStyle: 'italic', color: '#616161'}}>
                {"\n"}Where: 
                <Text style={{fontSize: 18, color: 'black', fontStyle: 'normal'}}>{"\n"}{e.get_address()}</Text>

                {"\n\n"}Description: 
                <Text style={{fontSize: 18, color: 'black', fontStyle: 'normal'}}>{"\n"}{e.get_desc()}</Text>

                {"\n\n"}When: 
                <Text style={{fontSize: 18, color: 'black', fontStyle: 'normal'}}>{"\n"}
                {dateFormat(e.get_start_date(), "m/d/yy h:MM TT")}
                 - 
                {dateFormat(e.get_end_date(), "m/d/yy h:MM TT")}
                </Text>
              </Text>
              

              <Text style={{fontStyle: 'italic', color: '#616161'}}>
                {"\n"}Tags: 
              </Text>
                <SafeAreaView style={styles.tags_container}>
                  <FlatList
                      horizontal = {true}
                      listKey="tags"
                      data={e.get_tags()}
                      renderItem={({item}) => <TagButton t={item} n={this.props.navigation} usr={usr} lvl_idx={e.get_hot_level() - 1}/> }
                      keyExtractor={item => item}
                  />
              </SafeAreaView>

                <Text>{"\n\n"}</Text>
                {boost_disp}
              
                <Text style={{fontStyle: 'italic', color: '#616161'}}>
                {"\n\n"}Hosted By: 
                </Text>
                {renderAdmins}

                <Text style={{textAlign: "center"}}> {"\n\n"}
                Attendees: 
                </Text>

                <TouchableHighlight onPress={() => this.onPress_viewUsers(e, 'interested')}>
                  <Text>
                    Interested: {"\n"}
                    {interested_str}
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.onPress_viewUsers(e, 'going')}>
                  <Text>
                    Going: {"\n"}
                    {going_str}
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.onPress_viewUsers(e, 'checkedIn')}>
                  <Text>
                    Going: {"\n"}
                    {checkedIn_str}
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
                title="Check In"
                color="#f194ff"
                onPress={() => {
                  start = e.get_start_date()
                  end = e.get_end_date()
                  curr = new Date().getTime()
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
              </View>
          </ScrollView>
          
        </View>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
  },
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


