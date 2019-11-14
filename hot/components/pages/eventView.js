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
    var u = new User(123, "test", "michael", "woo", "email@email.com", new Date(), "p1", null)
    var e = new Event("hotchoc", "hefh", new Date(), new Date("01 Jun 2020 00:00:00 GMT"), "Times Square", [], ["user1"])
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>
            {"\n"}{e.get_name()}

            {"\n\n"}Where: 
            {"\n"}{e.get_address()}

            {"\n\n"}When: 
            {"\n"}{e.get_start_date().toString()} - {e.get_end_date().toString()}

            {"\n\n"}Tags: 
            {"\n"}{renderTags}  

            {"\n\n"}Hosted By: 
            {"\n"}{e.get_admins()}     

            {"\n\n"}Attendees: 
            {"\n"} 0 friends & 0 people marked 'Interested'
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