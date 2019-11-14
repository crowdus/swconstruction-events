import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView} from 'react-native';
import Event from './event'
import User from './user'

/* Core - core functionality that aren't class specific */

export const BASE_URL = 'https://hot-backend.herokuapp.com/'
export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}


export function get_events(){
  fetch(`https://hot-backend.herokuapp.com/events/`, {
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

/*export function get_admins_from_event(administrator) {
  /* Make call to our API 
  fetch(`${BASE_URL}/events/`, {
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
}*/


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
     console.log(responseJson)
     return new User(responseJson)
  })
  .catch((error) => {
    console.error(error);
    return null
  });
}

/*export function get_user_from_username(username) {
  /* Make call to our API 
  fetch(`${BASE_URL}/users/${username}`, {
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

export function get_user_from_email(email) {
  /* Make call to our API 
  fetch(`${BASE_URL}/users/${email}`, {
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





