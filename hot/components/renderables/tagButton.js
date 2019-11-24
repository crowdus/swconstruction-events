import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, Icon, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event.js';
import User from '../classes/user.js';

export default class TagButton extends React.Component{
  constructor(props) {
    super(props)
    this.props = props
  }

  static navigationOptions = ({navigation}) => {
    return {
        drawerLabel: () => null
    }
  };
// to explain the no adjunct stranding generalization
        //<TouchableOpacity style={styles.tag_view} onPress={function () {this.props.n.navigate('TagView', {tag:this.props.t, usr:usr})}}>
  render() {
    const n = this.props.n
    const t = this.props.t
    const usr = this.props.usr
    return (
        <TouchableOpacity style={styles.tag_view} onPress={function () {n.push('TagView', {tag:t, usr:usr})}}>
            <Text>{this.props.t}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  tag_view: {
      padding: 5,
      paddingLeft: 7,
      marginRight: 5,
      marginBottom: 5,
      borderRadius: 2,
      backgroundColor: "#fad387"
  }, 
  tag_text: {
      fontSize: 12,
      color: "#000000",
  },
})
