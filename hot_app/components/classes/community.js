import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Commmunity extends Component {
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

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, event!</Text>
      </View>
    );
  }
}

