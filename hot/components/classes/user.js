/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';

export default class User extends Followable{
    constructor(userID, username, firstname, lastname, email, datejoined, password, following) {
      super()
      this.userID = userID
      this.username = username
      this.firstname = firstname
      this.lastname = lastname
      this.email = email
      this.datejoined = datejoined
      this.password = password
      this.following = following
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
      if ((!_userID.match(/^[0-9a-zA-Z]/))&&(_userID.match != "")){
        return false;
      }
      if(!finduser(_userID)){
        this.userID = _userID;
      }
      return true;
    }
    setUserName(_name) {
        if ((_name.match(/^[0-9a-zA-Z]/))&&(_name.match != "")){
          if(!finduser(_username)){
            this.username = _name;
          }
          return true;
        } else return false;
    }
    setFirstName(_firstname) {
      if (!_firstname.match(/^[a-zA-Z]/)&&(_firstname.match != "")){
        return false;
      }
      this.firstname = _firstname;
        return true;
    }
    setLastName(_lastname) {
      if ((!_lastname.match(/^[a-zA-Z]/))&&(_lastname.match != "")){
        return false;
      }
      this.lastname = _lastname;
        return true;
    }
    setEmail(_email) {
      if ((!_email.match(/^[0-9a-zA-Z]/))&&(_email.match != "")){
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
      if ((_password.match(/^[0-9a-zA-Z]/))&&(_password.match != "")){
        this.password = _password;
      }
    }

    get_admin_events(){
      //calculate the events that user created
      fetch('hot-backend.herokuapp.com/users/5dcb8f215f002a82da85b17a', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: this.UserID,
          status: 'admin',
        })
      });
      return [];
    }

    async get_interested_events(){
      //calculate the events that user clicked interested to using the UserID
      fetch('hot-backend.herokuapp.com/users/5dcb8f215f002a82da85b17a', {
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
    }

    get_going_events(){
      //calculate the events that user clicked going to using the UserID
      fetch('hot-backend.herokuapp.com/users/5dcb8f215f002a82da85b17a', {
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

    follow_event(_event){//?
      _event.addFollower(this);
      return true;
    }

    follow_user(_userID){
      if(_userID == this._userID) return false;
      fetch('hot-backend.herokuapp.com/users/5dcb8f215f002a82da85b17a', {
        method: 'GET',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: _userID,
        })
      });
      return true;
    }

    unfollow_user(_userID){
      if(_userID == this._userID) return false;

      fetch('hot-backend.herokuapp.com/users/5dcb8f215f002a82da85b17a', {
        method: 'GET',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: _userID,
        })
      });
      return true;
    }
    
}



