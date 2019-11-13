/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';

export class User {
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

    getUserID() {
      return this.userID;
    }
    get_UserName() {
        return this.username
    }
    getFirstName() {
      return this.firstname;
    }
    getLastName() {
      return this.lastname;
    }
    getEmail() {
      return this.email;
    }
    getDateJoined() {
      return this.datejoined;
    }
    getPassword() {
      return this.password;
    }
    setUserID(_userID) { //userIDs must use only alphanumerical and have at least one number and one alphabetical number
      if (!_userID.match(/^[0-9a-zA-Z]/)){
        return false;
      }
      if(!finduser(_userID)){
        this._userID = _userID;
      }
      return true;
    }
    setUserName(name) {
        if (!_name.match(/^[0-9a-zA-Z]/)){
        return false;
      }
      if(!finduser(_username)){
        this._username = name;
      }
        return true;
    }
    setFirstName(_firstname) {
      if (!_firstname.match(/^[a-zA-Z]/)){
        return false;
      }
      this.firstname = _firstname;
        return true;
    }
    setLastName(_lastname) {
      if (!_lastname.match(/^[a-zA-Z]/)){
        return false;
      }
      this.lastname = _lastname;
        return true;
    }
    setEmail(_email) {
      if (!_email.match(/^[0-9a-zA-Z]/)){
        return false;
      }
      if(!finduser(_email)){
        this.email = name;
      }
        return true;
    }
    setDateJoined(year, month, day) {
      var d = new Date(year, month, day);
      this.datejoined = d;
      return true;
    }
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

    get_interested_events(){
  //calculate the events that user clicked interested to using the UserID
  return []
    }
    get_going_events(){
  //calculate the events that user clicked going to using the UserID
  return []
    }
}