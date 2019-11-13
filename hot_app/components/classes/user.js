import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class User extends Component {
  constructor(userID, username, firstname, lastname, email, datejoined, password, friends) {
    this.userID = userID;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.datejoined = datejoined;
    this.password = password;
    this.followed = friends;
  }

  getUserID() {}
  get_UserName() {
      return this.username
  }
  getFirstName() {}
  getLastName() {}
  getEmail() {}
  getDateJoined() {}
  getPassword() {}
  setUserID(_userID) {}
  setUserName(name) {
      this.username = name
      return true
  }
  setFirstName(_firstname) {}
  setLastName(_lastname) {}
  setEmail(_email) {}
  setDateJoined(_date) {}
  setPassword(_password) {}
  followFriend(_username) {
      // get person based on username
      // follow friends based on username
      return true;
  }

  unfollowFriend(_username) {
      // todo
      return true;
  }

  followFriends(usernames) {}
  unfollowFriends(usernames) {}
  saveEvent(event, status) {}

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, event!</Text>
      </View>
    );
  }
}