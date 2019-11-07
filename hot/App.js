/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class User {
    constructor(name) {
        this.username = name
            //this.get_username = function() {return this.username}
    }

    get_username() {
        return this.username
    }

    set_username(name) {
        this.username = name
        return true
    }

}

//adding extra attributes (time/date)
//not implement send invite
//add address instead of loc field
//set event info

export class Event {
    MAX_TAGS = 5

    constructor(name, desc, start_date, end_date, address, tags, admin) {
        this.name = name
        this.desc = desc
        this.start_date = start_date
        this.end_date = end_date
        this.address = address
        this.tags = tags
        this.isBoosted = false
        this.admins = admin
    }

    get_name() { return this.name }
    get_desc() { return this.desc }
    get_start_date() { return this.start_date }
    get_end_date() { return this.end_date }
    get_address() { return this.address }
    get_tags() { return this.tags }
    isBoosted() { return this.isBoosted }
    get_admins() { return this.admins }

    set_name(new_name) {
        var new_len = new_name.length
        if (new_len > 0 && new_len <= 128) {
            this.name = new_name
            return true
        }
        return false
    }

    set_desc(new_desc) {
        this.desc = new_desc
        return true
    }

    set_start_date(new_date) {
        // we will have to write this compare function
        if (new_date <= this.end_date) {
            this.start_date = new_date
            return true
        }
        return false
    }

    set_end_date(new_date) {
        if (new_date >= this.start_date) {
            this.end_date = new_date
            return true
        }
        return false
    }

    set_address(new_addr) {
        this.addr = new_addr
        return true
    }

    set_tags(new_tags) {
        this.tags = new_tags
        return true
    }

    add_tag(new_tag) {
        var numTags = this.tags.length()
        if (numTags < MAX_TAGS) {
            this.tags.push(new_tag)
            return true
        }
        return false
    }

    set_boost() {
        this.isBoosted = true
        return true
    }

    add_admin(admin) {
        this.admins.push(admin)
        return true
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


}

export class Community {

    constructor(name, privacy) {
        this.name = name
        this.privacy = privacy
        this.events = []
        this.members = []
    }

    get_events() { return this.events }
    set_events(evts) { this.events = evts; return false; }
    get_members() { return this.members }
    set_members(members) { this.members = members; return false; }
    get_name() { return this.name }
    set_name(name) { this.name = name; return false; }
    get_privacy() { return this.privacy }
    set_privacy(privacy) { this.privacy = privacy; return false; }

    add_member(member) {}
    remove_member(member) {}
    is_member(member) {}
    add_event(evt) {}
    create_event(evt) {}
    is_event(evt) {}

}

const user = new User("asdf1")
user.set_username("asdf")

export default class Intro extends Component {
    render() {
        /*
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>
                This is a React Native snapshot test.
            </Text>
              <Text>
                 This is a React Native snapshot test. {user.get_username()}
              </Text>
            </View>
        );
        */
    }
}