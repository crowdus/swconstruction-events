import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class User extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, event!</Text>
      </View>
    );
  }
}

/* StyleSheet */
const userStyles = StyleSheet.create({
  textStyle: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 19,
    paddingTop: 19,
    fontSize: 13,
  },
});