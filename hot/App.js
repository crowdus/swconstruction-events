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
    constructor(userID, username, firstname, lastname, email, datejoined, password, friends) {
        this.userID = userID;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.datejoined = datejoined;
        this.password = password;
        this.followed = friends;
    }

    getUserID() {}
    get_UserName() {
        return this.username
    }
    getFirstName() {}
    getLastName() {}
    getEmail() {}
    getDateJoined() {}
    getPassword() {}
    setUserID(_userID) {}
    setUserName(name) {
        this.username = name
        return true
    }
    setFirstName(_firstname) {}
    setLastName(_lastname) {}
    setEmail(_email) {}
    setDateJoined(_date) {}
    setPassword(_password) {}
    followFriend(_username) {
        // get person based on username
        // follow friends based on username
        return true;
    }

    unfollowFriend(_username) {
        // todo
        return true;
    }

    followFriends(usernames) {}
    unfollowFriends(usernames) {}
    saveEvent(event, status) {}
}


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
    set_events(evts) { this.events = evts; return true; }
    get_members() { return this.members }
    set_members(members) { this.members = members; return true; }
    get_name() { return this.name }
    set_name(name) { this.name = name; return true; }
    get_privacy() { return this.privacy }
    set_privacy(privacy) { this.privacy = privacy; return true; }

    add_member(member) { return true; }
    remove_member(member) { return true; }
    is_member(member) { return true; }
    add_event(evt) { return true; }
    create_event(evt) { return true; }
    is_event(evt) { return true; }

}

e = new Event("asdf", "desc", new Date("2019-12-17T03:24:00"), new Date("2019-12-17T03:24:00"), "addr", "tags", null);
e1 = new Event("asdf1", "desc", new Date("2019-12-17T03:24:00"), new Date("2019-12-17T03:24:00"), "addr", "tags", null);

function ScrollEventUI({e}) {
    return (
        <View style={styles.evt_card}>
            <Text style={styles.evt_title}>{e.get_name()}</Text>
            <Text style={styles.evt_date}>{e.get_start_date().toString()} - {e.get_end_date().toString()}</Text>
            <Text style={styles.evt_addr}>{e.get_address()}</Text>
            <Text style={styles.evt_desc}>{e.get_desc()}</Text>
            <Text style={styles.evt_tags}>{e.get_tags()}</Text>
        </View>
    );
}

export default class Intro extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={[e, e1, e, e, e, e, e, e, e, e]}
                    renderItem={({item}) => <ScrollEventUI e={item}/> }
                    keyExtractor={item => item.get_name()}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
    },
    evt_card: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#eee"
    },
    evt_title: {
        fontSize:22
    },
    evt_date: {

    },
    evt_addr: {

    },
    evt_desc: {
        fontSize:18
    },
    evt_tags: {

    }
});
