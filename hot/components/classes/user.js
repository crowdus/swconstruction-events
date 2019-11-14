import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';


// Validation Functions 
export function check_valid_name(str){
  if (str == "")
    return false;
  if (typeof str === 'number')
    return false;
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

export function check_valid_email(email){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function check_valid_password(password){
  if (password.length < 10)
    return false;
  //return (password!= null) && (password.match("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[A-Z0-9]+$"));
  var code, i, len;
  var lower = 0;
  var upper = 0;
  var num = 0;
  for (i = 0, len = password.length; i < len; i++) {
    code = password.charCodeAt(i);
    if (code > 47 && code < 58) num ++;
    if (code > 64 && code < 91) upper++;
    if (code > 96 && code < 123) lower++;
  }
  if ((num >0) && (upper > 0) && (lower >0))
    return true;
  return false;
}

// data request function
export const BASE_URL = 'https://hot-backend.herokuapp.com'
export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const fetch = require("node-fetch");

export async function get_user_from_username(username) {
  try {
    /* Make call to our API */
      const response = await fetch(`${BASE_URL}/queryUserByUsername?username=${username}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
      const json = response.json()
      return json;
    }
  catch(err){
    console.log(err)
    return null;
  }
  return null;

}

export async function get_user_from_email(email) {
  /* Make call to our API */
  try{
    const response = await fetch(`${BASE_URL}/queryUserByEmail?email=${email}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    const json = response.json()
    return json;
  }
  catch(err){
    console.log(err)
    return null
  }
  return null
}

export async function get_events_from_userstat(userID, status) {
  try{
    const response = await fetch(`${BASE_URL}/userEvents/users/${userID}/${status}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
      const json = response.json()
      return json;
    }
  catch(err){
    console.log(err)
    return null;
  }
  return null;
}

export async function get_events_from_admin(username) {
  try{
    const response = await fetch(`${BASE_URL}/adminEvents?admin=${username}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
      const json = response.json()
      return json;
    }
  catch(err){
    console.log(err)
    return null;
  }
  return null;
}

// User Class
export default class User extends Followable {

    constructor(username, firstname, lastname, email, datejoined, password, friends) {
        super()
        // Validate Attributes
        var isGoodUser = check_valid_name(username) && 
                         check_valid_name(firstname) && 
                         check_valid_name(lastname) &&
                         check_valid_email(email) &&
                         check_valid_password (password);
        if (!isGoodUser) {
            this.username = ""
            this.firstname = ""
            this.lastname = ""
            this.email = ""
            this.datejoined = null
            this.password = ""
            this.friends = []
        }
        else{
        this.username = username
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.datejoined = new Date (datejoined)
        this.password = password
        this.friends = friends
      }
    }

    // Getters and Setters
    // getUserID() {return this.userID;}
    getUserName() {return this.username}
    getFirstName() {return this.firstname;}
    getLastName() {return this.lastname;}
    getEmail() {return this.email;}
    getDateJoined() {return this.datejoined;}
    getPassword() {return this.password;}


    // setUserID(_userID) { //userIDs must use only alphanumerical and have at least one number and one alphabetical number
    //   return true;
    // }
    async setUserName(_name) {
      var bool = check_valid_name(_name)
      if (!bool)
        return false;
      if (bool){
        async function check(){
          coolfriend = await get_user_from_username(_name);
          if (!("friends" in coolfriend)){
            return true
          }
          return false
        }
        var result = await check();
        if (result)
          this.username = _name
        return result;
      }
    }
    setFirstName(_firstname) {
      if (check_valid_name(_firstname)){
        this.firstname = _firstname;
        return true;
      }
      return false;
    }
    setLastName(_lastname) {
      if (check_valid_name(_lastname)){
        this.lastname = _lastname;
        return true;
      }
      return false;
    }
    async setEmail(_email) {
      var bool = check_valid_email(_email)
      if(!bool)
        return false;
      if (bool){
        async function check(){
          coolfriend = await get_user_from_email(_email);
          if (!("friends" in coolfriend)){
            return true
          }
          return false
        }
      var result = await check();
        if (result)
          this.email = _email
        return result;
      }
    }
    //   if (check_valid_email(_email)){
    //     this.email = _email;
    //     return true;
    //   }
    //   return false;    
    // }
    setDateJoined(_date) {
      if (_date == "")
        return false;
      this.datejoined = _date
      return true;
    }
    setPassword(_password) {
      if (check_valid_password(_password)){
        this.password = _password;
        return true;
      }
      return false;
    }

    async follow_user(_username){  
      if(_username == this.username) return false;
      coolfriend = await get_user_from_username(_username);
      //need query to access repeat followed
      if (!("friends" in coolfriend)){
        return false
      }
      if (this.friends.length === 0){
        this.friends = [_username];
        return true;
      }
      if (this.friends.includes(_username))
        return false
      this.friends.push(_username);
      return true;
    }

    

    async unfollow_user(_username){
      if(_username == this.username) return false;
      fakefriend = await get_user_from_username(_username);
      //need query to access repeat followed
      if (!("friends" in fakefriend)){
        return false
      }
      if (this.friends.includes(_username)){
        this.friends = this.friends.filter(e => e !== _username);
        return true
      }

      return false
    }

    follow_event(_event, status){
      if(get_event_from_id(_event.eventid)!= null){
        _event.addFollower(this, status);
      }
    }

    unfollow_event(_event){
      if(get_event_from_id(_event.eventid)!= null){
        _event.removeFollower(this);
      }
    }

    get_interested_events(){
      //calculate the events that user clicked interested to using the UserID
      var arr = get_events_from_userstat(this.userID, "interested")
      return arr.map(x =>  x.eventid)
    }
     
    get_going_events(){
          //calculate the events that user clicked going to using the UserID
          var arr = get_events_from_userstat(this.userID, "going")
          return arr.map(x =>  x.eventid)
    }

    get_admin_events(){
      //calculate the events that user created
      var eventarr = get_event_from_admin(this.username)
      if(eventarr === null) return false;
      return eventarr.map(x => x.eventid);
    }

}
