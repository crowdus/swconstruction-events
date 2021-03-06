import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
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

  render() {
    const {navigate} = this.props.navigation;
    // console.log('Hello from LogIn page!')
    return (
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="position" enabled   keyboardVerticalOffset={-280}>
      <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Image 
            source = {require('../../assets/hotlogo.png')} 
            style={{
              width: 200,
              height: 80,
              marginRight: -6,
              marginBottom: 12,
              marginTop: 12}}/>
          <Text>
            <Text style={{fontSize: 30}}>
              Welcome to Hot! {"\n\n"}
            </Text>
          
          </Text>
          <Text style={{justifyContent: "center"}}>
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
        </View>
        <View style={{justifyContent: "center", alignItems: "left"}}>
          <TextInput 
            textContentType={'password'} 
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(code) => this.setState({code})}
            value={this.state.code}
          />
        </View>
        <View>
          <Button
            title="Log In"
                color="#f194ff"
                onPress={ async () => {
                  // console.log('Username and passcode inputted: ' + this.state.username + '\n' + this.state.code)
                  var finduser = await get_user_from_username(this.state.username)
                  console.log(finduser)
                  // console.log(this.state.code)
                  // console.log(finduser.password)
                  // console.log(finduser)
                  // console.log(finduser.password == this.state.code)
                  if (finduser.password == this.state.code) {
                    // TODO: call to get some TA user
                    // TODO: pass in user to feed
                    console.log("valid combo from login page, logging in...\n")
                    var u = finduser
                    console.log(u)
                    globVars.user = new User(u['_id'], u['username'], u['firstname'], u['lastname'], u['email'], u['datejoined'], u['password'], u['point'], u['friends'], u['tags'])
                    console.log(globVars.user)
                    navigate('Feed')
                    this.setState((state) => {
                      return {username: "", code: ""};
                    })
                  }
                  else{
                    //comment back in if you dont want to type in everytime
                    //u = {"_id":"5dddae422c94dc00172c059d","refs":{},"updater":{},"username":"JiayiLin135","firstname":"quest","lastname":"racer","email":"questracer@gmail.com","datejoined":"1970-01-01T00:00:00.026Z","password":"Questracer1234","point":0,"friends":[],"location":[]}
                    //globVars.user = new User(u['_id'], u['username'], u['firstname'], u['lastname'], u['email'], u['datejoined'], u['password'], u['point'], u['friends'])
                    //console.log(globVars.user)
                    //navigate('Feed')
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
          </ScrollView>
        </KeyboardAvoidingView>
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
