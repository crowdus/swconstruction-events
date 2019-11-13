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
    constructor(userID, username, firstname, lastname, email, datejoined, password, followers) {
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

        this.followed = followers;
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
      const adminevents = await fetch('hot-backend.herokuapp.com/users/5dcb8f215f002a82da85b17a', {
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

    get_interested_events(){
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
      return await response.json();
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

      const _user = await fetch('hot-backend.herokuapp.com/users/5dcb8f215f002a82da85b17a', {
        method: 'GET',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: _userID,
        })
      });

      (await response.json()).addFollower(this);
      return true;
    }

    unfollow_user(_userID){
      if(_userID == this._userID) return false;

      const _user = await fetch('hot-backend.herokuapp.com/users/5dcb8f215f002a82da85b17a', {
        method: 'GET',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: _userID,
        })
      });

      (await response.json()).removeFollower(this);
      return true;
    }
    
}



