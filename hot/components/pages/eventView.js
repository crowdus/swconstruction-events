import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView, SafeAreaView, FlatList} from 'react-native';
import Event from '../classes/event.js'
import {
  Button,
  Alert,
} from 'react-native';
import User from '../classes/user.js';
import TagButton from '../renderables/tagButton'

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
    }
  }

  onPress_status = (e, status, usr) => {
    e.add_follower(usr, status, (eventuserid) => {
      console.log(eventuserid)
      this.getAttendeeStatus(e, usr)
      Alert.alert(`Marked as ${status}`)
    })
  }

  viewUsers = (status) => {
    var userList = []
    if (status == 'Going') {
      userList = this.state.interested_people
    }
    if (status == 'Interested'){
      userList = this.state.going_people
    }
  }

  async getAttendeeStatus(e, usr) {
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
      console.log(userEventObj)
      if (userEventObj){
        this.setState({userStatus:userEventObj['status']})
        this.setState({eventUserID:userEventObj['_id']})
      }
    })
  }

  componentDidMount() {
    var e = this.props.navigation.getParam('evt')
    var usr = this.props.navigation.getParam('usr')
    
    // Make API call
    this.getAttendeeStatus(e, usr)
  }

  render() {
    console.log(this.state)
    var e = this.props.navigation.getParam('evt')
    var usr = this.props.navigation.getParam('usr')
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

    var going_str = (
      <Text> 
        {numFriendsGoing} friends
        and {this.state.going_people.length - numFriendsGoing} other(s)
        marked 'Going' 
    </Text>)

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: '10%', marginLeft: '5%', marginRight: '5%',}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text>
              <Text style={{fontSize: 50, fontStyle: "italic", fontWeight: "bold", textAlign: "center",}}>{"\n"}{e.get_name()}</Text>
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
            
              <Text>
              {"\n\n"}Hosted By: 
              </Text>
              {renderAdmins}

              <Text style={{textAlign: "center"}}> {"\n\n"}
              Attendees: 
              </Text>

              <TouchableHighlight onPress={() => this.viewUsers('interested')}>
                <Text>
                  Interested: {"\n"}
                  {interested_str}
                </Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => this.viewUsers('going')}>
                <Text>
                  Going: {"\n"}
                  {going_str}
                </Text>
              </TouchableHighlight>

            <Text>
              {"\n\n"}Respond: 
            </Text>
            <View style={{flexDirection: 'row'}}>
            <TouchableHighlight onPress={() => this.onPress_status(e, "going", usr)}>
              <Text style ={{backgroundColor:
                            this.state.userStatus === "going"
                              ? "red"
                              : "grey"
                            }}>
                              <Text>Going</Text>
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.onPress_status(e, "interested", usr)}>
              <Text style ={{backgroundColor:
                            this.state.userStatus === "interested"
                              ? "red"
                              : "grey"
                            }}>
                              <Text>interested</Text>
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.onPress_status(e, "declined", usr)}>
              <Text style ={{backgroundColor:
                            this.state.userStatus === "declined"
                              ? "red"
                              : "grey"
                            }}>
                              <Text>Declined</Text>
              </Text>
            </TouchableHighlight>
            </View>
            <Text> {"\n"} </Text>
            <Button
              title="Explore More"
              color="#f194ff"
              onPress={() => this.props.navigation.navigate('Feed')}
            />
            <Button
              title="Check In"
              color="#f194ff"
              onPress={() => {
                start = e.get_start_date()
                end = e.get_end_date()
                curr = new Date()
                if ((start < curr) && (curr < end)){
                  this.onPress_status(e, "checkedIn")
                }
                else{
                  Alert.alert("Event Not In Session")
                }
              }}
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tags_container: {
    flex: 1,
    padding:10
  }
})


