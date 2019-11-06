/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class User {
    constructor(name){
        this.username = name
        //this.get_username = function() {return this.username}
    }

    get_username() {
        return this.username
    }

     set_username(name) {
       this.username = name 
    }

}

class Event {
}

class Community {
}

const user = new User("asdf1")
user.set_username("asdf")

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

