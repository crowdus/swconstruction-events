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
      'events':[]
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

  async getEventStatus(e, usr) {
    e.get_events((l) => {
      this.setState({interested_people:l})
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
    var renderEvents = renderArray(e.get_events())

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth:40, borderColor:"white"}}>
        <ScrollView>
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
            <Button
              title="Going"
              color="#f194ff"
              onPress={() => {this.onPress_status(e, "going", usr)}}
            />
            <Button
              title="Interested"
              color="#f194ff"
              onPress={() => {this.onPress_status(e, "interested", usr)}}
            />
            <Button
              title="Not Going"
              color="#f194ff"
              onPress={() => {this.onPress_status(e, "declined", usr)}}
            />
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