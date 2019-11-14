import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Current: 'login',
      'username': "",
      'password':""

    }
  }

  render() {
    return (
      <View>
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
          Enter Password:
        </Text>
        <TextInput
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <View>
        <Button
          title="Log In"
          color="#f194ff"
          // onPress={() => Alert.alert('Incorrect access code')}
          onPress={() => (this.state.username == "" ? 
            Alert.alert('Please enter username') : 
            (this.state.password == "" ? 
              Alert.alert('Please enter password') :
              Alert.alert('waiting for authentification')))}
        />
        <Button
          title="Do not have an account? Create one now!"
          color = "#f194ff"
          onPress={() => this.props.navigation.navigate('CreateUser')}
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