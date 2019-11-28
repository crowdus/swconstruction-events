import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event.js';
import User from '../classes/user.js';
import { globVars } from '../classes/core.js';

export default class UserCard extends React.Component{
  constructor(props) {
    super(props)
    this.props = props
  }

  static navigationOptions = ({navigation}) => {
    return {
        drawerLabel: () => null
    }
  };
// to explain the no adjunct stranding generalization
        //<TouchableOpacity style={styles.tag_view} onPress={function () {this.props.n.navigate('TagView', {tag:this.props.t, usr:usr})}}>
  render() {
    var item = this.props.usr
    var followingmessage = ""
    var friends = globVars.user.get_friends()
    if (friends.includes(item['_id'])){
        followingmessage = "Following\n"
    }
    var n = this.props.n
    console.log(item)
    console.log(this.props.before)
    return (
        <TouchableOpacity style={styles.evt_card} onPress={() => n.navigate('FriendView', {friend: item, previous: this.props.before})}>
          <View style={styles.evt_card}>
              <Text style={styles.evt_title}>@{item['username']}</Text>
              <Text style={styles.evt_desc}>
                  <Text style={{fontSize: 14, fontStyle: 'italic'}}>
                      {followingmessage != "" ? followingmessage : ""}
                  </Text>
                  {item['firstname']} {item['lastname']}
                  {"\n"}
                  {item['email']}
                  {"\n"}   
            </Text>
          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  evt_title: {
      fontSize:32,
      marginBottom: 5,
  },
  evt_date: {
      color: "#666",

  },
  evt_addr: {
      color: "#666",
      marginBottom: 5,

  },
  evt_desc: {
      fontSize: 14,
      marginBottom: 12,
  },
  tags_container: {
    flex: 1,
    padding:10,
  },
  evt_card: {
    padding: 10,
    paddingLeft: 15,
    marginBottom: 10,
    backgroundColor: "#eee"
},
  evt_title: {
      fontSize:32,
      marginBottom: 5,
  },
  evt_date: {
      color: "#666",

  },
  evt_addr: {
      color: "#666",
      marginBottom: 5,

  },
  evt_desc: {
      fontSize: 14,
      marginBottom: 12,
  },
})
