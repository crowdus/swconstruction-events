import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "username": "",
      "code": ""
    }
    this.props=props
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Welcome to Hot! {"\n\n"}
          Enter Username:
        </Text> 
        <TextInput
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <Text>
          {"\n"}
          Beta Access Code:
        </Text>
        <TextInput
          placeholder="Access Code"
          onChangeText={(code) => this.setState({code})}
          value={this.state.code}
        />

        <View>
        <Button
          title="Log In"
          color="#f194ff"
          onPress={function () { navigate('Feed')}}
        />
      </View>
      </View>
    );
  }
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});