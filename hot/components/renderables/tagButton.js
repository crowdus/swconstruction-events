import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, Icon, TouchableOpacity} from 'react-native';

export default class TagButton extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <View style={styles.tag_view}><Text style={styles.tag_text}>{this.props.t}</Text></View>
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
