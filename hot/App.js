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
    constructor(name){
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

export class Event {
    constructor(name, desc, date, time, loc, tag) {
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

    add_member(member) {return true;}
    remove_member(member) {return true;}
    is_member(member) {return true;}
    add_event(evt) {return true;}
    create_event(evt) {return true;}
    is_event(evt) {return true;}

}


export default class Intro extends Component {
    render() {
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
  }
}

