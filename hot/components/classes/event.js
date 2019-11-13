import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';

const MAX_TAGS = 5

export default class Event extends Followable {
  constructor(props) {
    super(props);
    // Unwrap from properties
    this.name = this.props.name
    this.desc = this.props.desc
    this.start_date = this.props.start_date
    this.end_date = this.props.end_date
    this.address = this.props.address

    this.isBoosted = false;
    this.tags = new Set();
    this.admins = new Set();
    this.admins.add("user1") //TODO: change to user's username
  }

  /* 
    Constructor Helper function
    (Parses and Validates Data from form creation)
    Returns True if valid and modifies object
    Returns False if invalid
  */
  consHelper(values) {
    // Validate Data: check if Dates are valid
    var start_date = new Date(values.start_date)
    var end_date = new Date(values.end_date)
    if (end_date <= start_date){
        return false
    }
    // Set Values
    this.set_name(values.name)
    this.set_address(values.address)
    this.set_desc(values.description)
    this.set_end_date(values.end_date)
    this.set_start_date(values.start_date)

    // Parse Tag Data to set
    if (values.tags != "") {
        tagArray = values.tags.split(/[ ,]+/)
        for (var tag of tagArray) {
            this.add_tag(tag) /* TODO: make these sets instead of arrays */
        }
    }
    // Parse Admin Data to set
    if (values.admins != "") {
        adArray = values.admins.split(/[ ,]+/)
        for (var ad of adArray) {
            this.add_admin(ad)
        }
    }
    return true
  }

  // Getters and Setters
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

  change_start_date(new_date) {
      // we will have to write this compare function
      if (new_date <= this.end_date) {
          this.start_date = new_date
          return true
      }
      return false
  }

  change_end_date(new_date) {
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
      var numTags = this.tags.size
      if (numTags < MAX_TAGS) {
          this.tags.add(new_tag)
          return true
      }
      return false
  }

  set_boost() {
      this.isBoosted = true
      return true
  }

  add_admin(admin) {
      this.admins.add(admin)
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