import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';
import {get_user_from_username} from './core';
// Validation Functions 
function check_valid_name(str){
  if (str == "")
    return false;
  if (typeof str == 'number')
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

function check_valid_email(email){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function check_valid_date(_date){
  if (_date == "")
    return false;
  _date = new Date(_date);
  var d = _date.getDate() +1;
  var m = _date.getMonth() + 1;
  var y = _date.getFullYear();
  var ndate = new Date(y,m-1,d); 
  var con_date =
    ""+ndate.getFullYear() + (ndate.getMonth()+1) + ndate.getDate(); //converting the date
  var gdate = "" + y + m + d; //given date
  return ( gdate == con_date); //return true if date is valid
}

function check_valid_password(password){
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
  if ((num >=0) && (upper > 0) && (lower >0))
    return true;
  return false;
}

// const fetch = require("node-fetch");
// export const BASE_URL = 'https://hot-backend.herokuapp.com'
// export function get_user_from_id(userid) {
//   /* Make call to our API */
//   fetch(`${BASE_URL}/users/${userid}`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   })
//   .then((response) => response.text())
//   .then((responseJson) => {
//     // responseJson is a struct of parameters
//      console.log(responseJson)
//      return new User(responseJson)
//   })
//   .catch((error) => {
//     console.error(error);
//     return null
//   });
// }
// function is_valid_date_pair(start_date, end_date){
//     return (start_date < end_date)
// }

export default class User extends Followable {

    constructor(username, firstname, lastname, email, datejoined, password, friends) {
        super()
        // Validate Attributes
        var isGoodUser = check_valid_name(username) && 
                         check_valid_name(firstname) && 
                         check_valid_name(lastname) &&
                         check_valid_email(email) &&
                         check_valid_date(datejoined) &&
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
    setUserName(_name) {
      if (check_valid_name(_name)){
        this.username = _name;
        return true;
      }
      return false;
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
    setEmail(_email) {
      if (check_valid_email(_email)){
        this.email = _email;
        return true;
      }
      return false;    
    }
    setDateJoined(_date) {
      if (check_valid_date(_date)){
        this.datejoined = _date;
        return true;
      }
      return false;
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
      console.log(coolfriend);
      //need query to access repeat followed
      if (!("friends" in coolfriend)){
        return false
      }
      if (this.friends.length === 0){
        this.friends = [_username];
        return true;
      }
      this.friends.push(_username);
      return true;
    }

    unfollow_user(_username){
      if(_username == this.username) return false;
      fakefriend = get_user_from_username(_username);
      //need query to access repeat followed
      if (fakefriend == null)
        return false;
      this.friends = this.friends.filter(e => e !== _username);//fix
      return true;
    }


}