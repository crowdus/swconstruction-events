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
  }

  onPress_interested = () => {
    //username = GLOBAL.screen1
    test_event.addFollower(test_user)
  }

  render() {
    //var u = new User(123, "test", "michael", "woo", "email@email.com", new Date(), "p1", null)
    //var e = new Event("hotchoc", "hefh", new Date(), new Date("01 Jun 2020 00:00:00 GMT"), "Times Square", [], ["user1"])
    var e = this.props.navigation.getParam('evt')
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
            <Text>
              <Text style={{fontSize: 50, fontStyle: "italic", fontWeight: "bold", textAlign: "center",}}>{"\n"}{e.get_name()}</Text>

              {"\n\n"}Where: 
              <Text style={{fontSize: 20,}}>{"\n"}{e.get_address()}</Text>

              {"\n\n"}When: 
              <Text style={{fontSize: 20,}}>{"\n"}{e.get_start_date().toString()} - {e.get_end_date().toString()}</Text>

              {"\n\n"}Tags: 
              <Text style={{fontSize: 20,}}>{"\n"}{renderTags}</Text>

              {"\n\n"}Hosted By: 
              <Text style={{fontSize: 20,}}>{"\n"}{e.get_admins()}</Text>

              <Text style={{textAlign: "center"}}> {"\n\n"}Attendees: 
              {"\n"}{"\n"} 0 friends & 0 people marked 'Interested'</Text>
            </Text>
              <Button
              title="View More"
              color="#f194ff"
              onPress={() => Alert.alert('Open View Screen')}
              />
              <Text>
              {"\n"}0 friends & 0 people marked 'Going'
            
              </Text>
              <Button
                title="View More"
                color="#f194ff"
                onPress={() => get_event_from_id('5dcb3523937a563b54aad5fb')}
              />
            <Text>
              {"\n\n"}Respond: 
            </Text>
            <View style={{flexDirection: 'row'}}>
            <Button
              title="Going"
              color="#f194ff"
              onPress={() => Alert.alert('Added Event')}
            />
            <Button
              title="Interested"
              color="#f194ff"
              onPress={() => Alert.alert('Added Event')}
            />
            <Button
              title="Not Going"
              color="#f194ff"
              onPress={this.onPress_interested}
            />
            </View>
            <Text> {"\n"} </Text>
            <Button
              title="Explore More"
              color="#f194ff"
              onPress={() => Alert.alert('Go Back to Home Screen')}
            />
        </View>
    );
  }
}
