import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView} from 'react-native';
import Event from '../classes/event.js'
import Core, { get_event_from_id } from '../classes/core.js'
import {
  Button,
  Alert,
} from 'react-native';
import User from '../classes/user.js';

export default class EventView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      'numInterested': 0,
      'numGoing': 0,
      'some':''
    }
  }

  onPress_status = (e, status, usr) => {
    //username = GLOBAL.screen1
    console.log(usr)
    e.add_follower(usr,status,(eventuserid)=>{
      Alert.alert(`Marked as ${status}`)
      if (status == 'interested'){
        this.setState({numInterested:this.state.numInterested})
      }
      if (status == 'going'){
        this.setState({numGoing:this.state.numGoing})
      }
    })
  }

  componentDidMount() {
    var e = this.props.navigation.getParam('evt')
    var usr = this.props.navigation.getParam('usr')
    e.get_status_people("interested", (l)=>{
      this.setState({numInterested:l.length})
    })
    e.get_status_people("going", (l)=>{
      this.setState({numGoing:l.length})
    })
  }

  render() {
    //var u = new User(123, "test", "michael", "woo", "email@email.com", new Date(), "p1", null)
    //var e = new Event("hotchoc", "hefh", new Date(), new Date("01 Jun 2020 00:00:00 GMT"), "Times Square", [], ["user1"])
    var e = this.props.navigation.getParam('evt')
    var usr = this.props.navigation.getParam('usr')

    console.log(e)
    var tags = e.get_tags()
    var renderTags;
    if (tags.size == 0) {
      renderTags = <Text> No Tags Yet </Text>
    }
    else {
      renderTags = <Text> {tags} </Text>
    }
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

              {"\n\n"}Tags: 
              <Text style={{fontSize: 20,}}>{"\n"}{renderTags}</Text>

              {"\n\n"}Hosted By: 
              <Text style={{fontSize: 20,}}>{"\n"}{e.get_admins()}</Text>

              <Text style={{textAlign: "center"}}> {"\n\n"}Attendees: 
              {"\n"}{"\n"} {this.state.numInterested} people marked 'Interested'</Text>
            </Text>
              
              <Text>
              {"\n"} {this.state.numGoing} people marked 'Going'
            
              </Text>
              
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
