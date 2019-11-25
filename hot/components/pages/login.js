import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import User from '../classes/user.js';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "username": "",
      "code": ""
    }
  }

  render() {
    var userTA = new User("5dcd241d8a5d632450dea810", "johndoe12", "John", "Doe", "johndoe@email.com", new Date(), "Password123", 1, ['am0002'])
    console.log("USERTA: " + userTA._id5)
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
          onPress={ () => {
            if (this.state.code == "" && this.state.username == "") {
              // TODO: call to get some TA user
              // TODO: pass in user to feed
              console.log("hello")
              navigate('Feed', {usr: userTA})
            }
            else{
              Alert.alert("Incorrect login")
            }
          }}
        />

        <Button
          title="Register"
          color="#f194ff"
          onPress={ () => {
              console.log("hello")
              navigate('Registration')
          }}
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
