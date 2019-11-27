import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import User, { get_user_from_username } from '../classes/user.js';
import Icon from 'react-native-vector-icons/Octicons'
import { globVars } from '../classes/core.js'

// export async function validcombo(username, password){
//   var ret = false;
//   var auser;
//   // console.log('checking valid combo')
//   // console.log(get_user_from_username(username))
//   if(auser = await get_user_from_username(username)){
//     console.log(auser)
//     if(auser.password === password){
//       ret = true;
//     }
//   }
//   return ret;
// }

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "username": "",
      "code": ""
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      drawerLockMode: 'locked-closed',
      drawerLabel: () => null
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    // console.log('Hello from LogIn page!')
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
          onPress={ async () => {
            // console.log('Username and passcode inputted: ' + this.state.username + '\n' + this.state.code)
            var finduser = await get_user_from_username(this.state.username)
            // console.log(this.state.code)
            // console.log(finduser.password)
            // console.log(finduser)
            // console.log(finduser.password == this.state.code)
            if (finduser.password == this.state.code) {
              // TODO: call to get some TA user
              // TODO: pass in user to feed
              console.log("valid combo from login page, logging in...\n")
              var u = finduser
              globVars.user = new User(u['_id'], u['username'], u['firstname'], u['lastname'], u['email'], u['datejoined'], u['password'], u['point'], u['friends'])
              navigate('Feed')
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
