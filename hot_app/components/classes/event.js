import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Event extends Component{
  MAX_TAGS = 5

  constructor(props) {
    super(props);
    /*
    this.name = name
    this.desc = desc
    this.start_date = start_date
    this.end_date = end_date
    this.address = address
    this.tags = tags
    this.isBoosted = false
    this.admins = admin
    */
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
  
  render() {
    return (
      <View>
        <Text>Hello, welcome to {this.props.name}!</Text>
      </View>
    );
  }

}