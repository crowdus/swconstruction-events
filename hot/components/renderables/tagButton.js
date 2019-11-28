import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event.js';
import User from '../classes/user.js';
import { globVars } from '../classes/core.js';

export default class TagButton extends React.Component{
  constructor(props) {
    super(props)
    this.props = props
  }

        //<TouchableOpacity style={styles.tag_view} onPress={function () {this.props.n.navigate('TagView', {tag:this.props.t, usr:usr})}}>
  render() {
    const n = this.props.n
    const t = this.props.t
    const usr = this.props.usr
    const lvl_idx = this.props.lvl_idx
    var tag_view_style = styles.tag_view

    var color = globVars.tag_colors[lvl_idx]
    if (lvl_idx == -1){
      color = "#d1d1d1" //gray tag
    }
    tag_view_style['backgroundColor'] = color
    return (
        <TouchableOpacity style={tag_view_style} onPress={function () {n.push('TagView', {tag:t, usr:usr})}}>
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
  }, 
  tag_text: {
      fontSize: 12,
      color: "#000000",
  },
})
