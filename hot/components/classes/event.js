import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';
import Geocoder from 'react-native-geocoding';

export const BASE_URL = 'https://hot-backend.herokuapp.com'
export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const MAX_TAGS = 5

// Validation Functions 
function is_valid_name(new_name){
    var new_len = new_name.length
    return (new_len > 0 && new_len <= 128) 
}

function is_valid_desc(new_desc){
    var new_len = new_desc.length
    return new_len <= 1000
}

function is_valid_date_pair(start_date, end_date){
    return (start_date < end_date)
}

export function is_valid_addr(addr, cb){
    Geocoder.from(addr)
    .then(json => {
        var location = json.results[0].geometry.location;
        cb(location)
    })
    .catch(() => {
        event.set_null()
        cb(null)
    })
}

export function get_loc_from_addr(new_addr, event, cb){
    Geocoder.from(new_addr)
    .then(json => {
        var location = json.results[0].geometry.location;
        event.set_loc(location)
        cb(location)
    })
    .catch(() => {
        event.set_null()
        cb(null)
    })
}


// Returns event object given an event ID
export function get_event_from_id(eventid, cb) {
    /* Make call to our API */
    fetch(`${BASE_URL}/events/${eventid}`, {
      method: 'GET',
      headers: fetch_headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      cb(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  
/* 
Note: Javascript does not support function overloading, I cannot
have more than 1 constructor
*/
export default class Event extends Followable {

    constructor(_id, name, desc, start, end, addr, tags, admins) {
        super()
        var isGoodEvent = is_valid_name(name) && 
                          is_valid_desc(desc) &&
                          is_valid_date_pair(start, end)
        // Validate Attributes
        this.eventid = _id
        this.name = name
        this.desc = desc
        this.start_date = new Date(start)
        this.end_date = new Date(end)
        this.addr = addr
        this.loc = null
        this.isBoosted = false
        this.tags = tags
        this.admins = admins

        if (!isGoodEvent) {
            this.set_null()
        }
    }


    set_null(){
        this.name = ""
        this.desc = ""
        this.start_date = null
        this.end_date = null
        this.addr = ""
        this.loc = null
        this.isBoosted = null
        this.tags = []
        this.admins = []
    }

    is_null_event(){
        return (this.name == "" 
             && this.addr == ""
             && this.start_date == null
             && this.end_date == null
             && this.isBoosted == null)
    }

    // Getters and Setters
    get_eventID() { return this.eventid}
    set_eventID(id) {
        this.eventid = id
        return true
    }
    get_name() { return this.name }
    get_desc() { return this.desc }
    get_start_date() { return this.start_date }
    get_end_date() { return this.end_date }
    get_address() { return this.addr }
    get_tags() { return this.tags }
    is_boosted() { return this.isBoosted }
    get_admins() { return this.admins }
    is_admin(username) { return (this.admins.includes(username))}

    set_name(new_name) {
        if (is_valid_name(new_name)){
            this.name = new_name
            return true
        }
        return false
    }

    set_loc(loc) {
        this.loc = loc
        return true
    }
    
    set_desc(new_desc) {
        if (is_valid_desc(new_desc)){
            this.desc = new_desc
            return true
        }
        return false
    }

    /* Note: Set address always called within is_valid_addr callback */
    set_address(new_addr) {
        this.addr = new_addr
        return true
    }
    
    set_loc(loc){
        this.loc = loc
        return true
    }

    set_start_date(start) {
        if (is_valid_date_pair(start, this.end_date)){
            this.start_date = start
            return true
        }
        return false
    }

    set_end_date(end) {
        if (is_valid_date_pair(this.start_date, end)){
            this.end_date = end
            return true
        }
        return false
    }

    set_tags(new_tags) {
        this.tags = new_tags
        return true
    }

    add_tag(new_tag) {
        var numTags = this.tags.length
        if (numTags < MAX_TAGS) {
            if (!this.tags.includes(new_tag)) {
                this.tags.push(new_tag)
                return true
            }
        }
        return false
    }

    set_boost() {
        this.isBoosted = true
        return true
    }

    add_admin(admin) {
        if (!this.admins.includes(admin)) {
            this.admins.push(admin)
            return true
        }
        return false
    }

    /* TODO: get going and get interested is off */
    /*
        Different statuses are:
        "Interested"
        "Going"
        "CheckedIn"
     */
    get_status_people(status, cb) {
        fetch(`${BASE_URL}/userEvents/events/${this.eventid}/${status}`, {
            method: 'GET',
            headers: fetch_headers,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            cb(responseJson)
        })
        .catch((error) => {
            console.error(error);
            cb(null)
        });
    }

    /* Started writing for iteration #2 */
    get_status_friends(username, eventname, status, cb) {
        fetch(`${BASE_URL}/queryFriendsAttendingEvent?username=${username}&eventName=${eventname}&status=${status}`, {
            method: 'GET',
            headers: fetch_headers,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            cb(responseJson)
        })
        .catch((error) => {
            console.error(error);
            cb(null)
        });
        return []
    }

    add_follower(user, status, cb) {
        fetch(`${BASE_URL}/userEvents`, {
            method: 'POST',
            headers: fetch_headers,
            body: JSON.stringify({
                status: status,
                event_id: this.eventID,
                user_id: user.userID,
            })
        })
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText)
            cb(responseText)
        })
        .catch((error) => {
            console.error(error);
            cb(null)
        });
    }

    /* Note: Started Implemented for Iteration 2, but not part of Iter 1*/
    remove_follower(usereventID) {
        fetch(`${BASE_URL}/userEvents/${usereventID}`, {
            method: 'DELETE',
            headers: fetch_headers,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            cb(responseJson)
        })
        .catch((error) => {
            console.error(error);
            cb(null)
        });
    }
    
    render() {
        return (
        <View>
            <Text>Hello, welcome to {this.props.name}!</Text>
        </View>
        );
    }
}
