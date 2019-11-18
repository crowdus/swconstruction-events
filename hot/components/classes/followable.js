/* Super class for user, tags, and events, since all are 'followable' */

import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Followable extends React.Component{
  constructor(props) {
    super(props)
  }

  addFollower(user) {}
  removeFollower(user) {}

}