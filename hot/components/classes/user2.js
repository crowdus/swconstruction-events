import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';


// Validation Functions 
function is_valid_name(new_name){
    var new_len = new_name.length
    return (new_len > 0 && new_len <= 128) 
}

function is_valid_desc(new_desc){
    var new_len = new_desc.length
    return new_len <= 1000
}

function is_valid_addr(new_addr){
    /* Need to access Google Maps API */
    if (new_addr.length > 0){
        return true
    }
}

function is_valid_date_pair(start_date, end_date){
    return (start_date < end_date)
}

export default class User extends Followable {

    constructor(username, firstname, lastname, email, datejoined, password, friends) {
        super()
        // Validate Attributes
        var isGoodUser = check_valid_username(username) && 
                         check_valid_firstname(firstname) && 
                         check_valid_lastname(lastname) &&
                         check_valid_email(email) &&
                         check_valid_password (password)
        if (!isGoodEvent) {
            return null
        }

        this.name = name
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.datejoined = new Date (datejoined)
        this.password = password
        this.friends = friends
    }

    // Getters and Setters
    getUserID() {return this.userID;}
    get_UserName() {return this.username}
    getFirstName() {return this.firstname;}
    getLastName() {return this.lastname;}
    getEmail() {return this.email;}
    getDateJoined() {return this.datejoined;}
    getPassword() {return this.password;}


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
}