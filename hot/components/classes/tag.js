import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';

export default class Tag extends Followable {
  constructor(TagID, name) {
      super(TagID, name)
      this.events = []
      this.members = []
  }

  get_events() { return this.events }
  add_event(evt) { return true; }
  remove_event(evt) { return true; }

  get_name() { return this.name }
  set_name(name) { this.name = name; return true; }

  is_event(evt) { return this.get_events().contains(evt) }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, event!</Text>
      </View>
    );
  }
}

