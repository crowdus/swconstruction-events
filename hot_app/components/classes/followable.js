import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Followable {
  MAX_TAGS = 5

  constructor(ID, name) {
    this.ID = ID;
    this.name = name;
  }

  addFollower(user) {}
  removeFollower(user) {}

}