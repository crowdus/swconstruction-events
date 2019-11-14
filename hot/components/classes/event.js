import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';
import Geocoder from 'react-native-geocoding';


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

/* 
Note: Javascript does not support function overloading, I cannot
have more than 1 constructor
*/
export default class Event extends Followable {

    constructor(name, desc, start, end, addr, tags, admins) {
        super()
        var isGoodEvent = is_valid_name(name) && 
                          is_valid_desc(desc) &&
                          is_valid_date_pair(start, end)
        // Validate Attributes
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
            this.name = ""
            this.desc = ""
            this.start_date = null
            this.end_date = null
            this.addr = ""
            this.lat = null
            this.isBoosted = null
            this.tags = []
            this.admins = []
        }
    }

    set_null(){
        this.name = ""
        this.desc = ""
        this.start_date = null
        this.end_date = null
        this.addr = ""
        this.lat = null
        this.isBoosted = null
        this.tags = []
        this.admins = []
    }

    is_null_event(){
        return (this.name == "" && this.addr == "")
    }

    // Getters and Setters
    get_name() { return this.name }
    get_desc() { return this.desc }
    get_start_date() { return this.start_date }
    get_end_date() { return this.end_date }
    get_address() { return this.addr }
    get_tags() { return this.tags }
    isBoosted() { return this.isBoosted }
    get_admins() { return this.admins }

    set_name(new_name) {
        if (is_valid_name(new_name)){
            this.name = new_name
            return true
        }
        return false
    }

    set_desc(new_desc) {
        if (is_valid_dec(new_desc)){
            this.desc = new_desc
            return true
        }
        return false
    }

    set_address(new_addr) {
        if (is_valid_addr(new_addr)){
            this.addr = new_addr
            return true
        }
        return false
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

    get_interested_people() {
        // calculate interested people from database user/event relation table
        return []
    }

    get_going_people() {
        // calculate going people from database user/event relation table
        return []
    }

    get_check_ins() {
        // calculate people that have checked in to event 
        // (relevant only after event past)
        return []
    }

    /* TODO: mark these extra methods in design doc */
    get_going_friends(user) {
        return []
    }

    get_interested_friends(user){
        return []
    }

    follow(user){
        return true
    }
    
    render() {
        return (
        <View>
            <Text>Hello, welcome to {this.props.name}!</Text>
        </View>
        );
    }
}