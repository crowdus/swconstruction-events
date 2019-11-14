import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView} from 'react-native';
import Event from './event'
import User from './user'

/* Core - core functionality that aren't class specific */

export const BASE_URL = 'https://hot-backend.herokuapp.com'
export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const fetch = require("node-fetch");
// Returns event object given an event ID
export function get_event_from_id(eventid) {
  /* Make call to our API */
  fetch(`${BASE_URL}/events/${eventid}`, {
    method: 'GET',
    headers: fetch_headers,
  })
  .then((response) => response.json())
  .then((responseJson) => {
    // responseJson is a struct of parameters
    return new Event(responseJson)
  })
  .catch((error) => {
    console.error(error);
    return null
  }); 
}


// Returns user object given a user ID
export function get_user_from_id(userid) {
  /* Make call to our API */
  fetch(`${BASE_URL}/users/${userid}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    // responseJson is a struct of parameters
     return new User(responseJson)
    console.log(responseJson)
  })
  .catch((error) => {
    console.error(error);
    return null
  });
}

export async function get_user_from_username(username) {
  try {
    /* Make call to our API */
    // const response = await fetch(`${BASE_URL}/queryUserByUsername?username=${username}`, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // })
    // console.log(response);
    // const responseJson = response.json()
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

export async function get_events_from_admin(username) {
  /* Make call to our API */
  /*fetch(`${BASE_URL}/adminEvents?admin=${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    // responseJson is a struct of parameters
     console.log(Json);

     arr = responseJson.map(e => e._id);
     return arr;
  })
  .catch((error) => {
    console.error(error);
    return null
  });*/

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


// export function get_user_from_email(email) {
//   /* Make call to our API */
//   fetch(`${BASE_URL}/queryUserByEmail?email=${email}`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   })
//   .then((response) => response.text())
//   .then((responseJson) => {
//     // responseJson is a struct of parameters
//      return new User(responseJson)
//     console.log(responseJson)
//   })
//   .catch((error) => {
//     console.error(error);
//     return null
//   });
// }