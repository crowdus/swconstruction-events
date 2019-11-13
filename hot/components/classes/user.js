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
        if (userID.match(/^[0-9a-zA-Z]/)){
          if(!finduser(userID)){
            this.userID = userID;
          }
        }

        if (username.match(/^[0-9a-zA-Z]/)){
          if(!finduser(username)){
            this.username = username;
          }
        }
        
        if (firstname.match(/^[a-zA-Z]/)){
          this.firstname = firstname;
        }

        if (lastname.match(/^[a-zA-Z]/)){
          this.lastname = lastname;
        }

        if (email.match(/^[0-9a-zA-Z]/)){
          if(!finduser(email)){
            this.email = email;
          }
        }

        this.datejoined = new Date(datejoined); //need validation for this?

        if (password.match(/^[0-9a-zA-Z]/)){
          this.password = password;
        }

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
    /*setUserID(_userID) { //userIDs must use only alphanumerical and have at least one number and one alphabetical number
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
    }*/
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
        this.email = _email;
      }
        return true;
    }
    /*setDateJoined(year, month, day) {
      var d = new Date(year, month, day);
      this.datejoined = d;
      return true;
    }*/
    setPassword(_password) {
      if (_password.match(/^[0-9a-zA-Z]/)){
        this.password = _password;
      }
    }

    get_admin_events(){
      //calculate the events that user created


      return [];
    }

    get_interested_events(){
      //calculate the events that user clicked interested to using the UserID
      
      fetch('hot-backend.herokuapp.com/events', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: this.UserID,
          status: 'interested',
        })
      });
      return [];
    }

    get_going_events(){
      //calculate the events that user clicked going to using the UserID
      
      fetch('hot-backend.herokuapp.com/events', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: this.UserID,
          status: 'going',
        })
      });
      return [];
    }

    follow_event(_event){
      _event.follow(this.username);
    }
}



