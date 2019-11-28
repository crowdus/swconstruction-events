import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView} from 'react-native';
import t from 'tcomb-form-native';
import User, {isGoodUser, get_user_from_id, get_user_from_username, change_user_database} from '../classes/user.js'
import Geocoder from 'react-native-geocoding';
import {
  Alert,
} from 'react-native';
import {globVars} from '../classes/core';

export const BASE_URL = 'https://hot-backend.herokuapp.com'
export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

/* Create Form Structure for the form builder library*/
const Form = t.form.Form;

const newUser = t.struct({
  username: t.String,
  firstname: t.String,
  lastname: t.String,
  email: t.String,
  password: t.String
});

/* Set Form Placeholders and input validation settings */
var options = {
  fields: {
    username: {
      // placeholder: 'Must contain at least one alphabetical and one numeric character',
      label: 'Username',
      maxLength: 100
    },
    firstname: {
      // placeholder: 'David',
      label: 'Firstname',
      maxLength: 100
    },
    lastname: {
      // placeholder: 'Johnson',
      label: 'Lastname',
      maxLength: 100
    },
    email: {
      // placeholder:'davidjohnson@gmail.com',
      label: 'Email address',
      maxLength: 100
    },
    password: {
      // placeholder: 'Must contain at least one alphabetical and one numeric character',
        label: 'Password',
        maxLength: 20
    }
  }
}

/*export function change_user_database(user){
  // console.log("UPDATE")
  // console.log(user)
  fetch(`${BASE_URL}/users/`, {
    method: 'PUT',
    headers: fetch_headers,
    body: JSON.stringify(user)
  })
  .then((response) => response.text())
  .then((responseVal) => {
    return responseVal
  })
  .catch((error) => {
    console.log(error)
    return null
  });   
}*/

export default class EditUser extends React.Component {
    constructor(props){
      super(props)
      this.onPress = this.onPress.bind(this);
    }
  
      /* onForm Submit function */
    onPress = async (usr) => {
        var value = this.refs.form.getValue();
        const checkdup = await get_user_from_username(value.username);
        if(("friends" in checkdup) && !(checkdup._id == usr._id)){
          console.log(checkdup._id == usr._id)
          Alert.alert('', 'Username taken', 
          [
            { text: 'Retry',
              onPress: () => this.props.navigation.navigate('EditUser')
            }
          ]
          )
        }
        else{
            if (value) { 
                console.log(value.username)
                var valid = isGoodUser(value.username, value.firstname, value.lastname, value.email, value.password)
                console.log(valid)
                if (valid) {
                    var validUser = new User(usr._id, value.username, value.firstname, value.lastname, value.email, new Date().getDate(), value.password, 0, []);
                    console.log("start updating database")
                    var result = change_user_database(validUser) 
                    Alert.alert("Successfully updated!")
                    var updateduser = get_user_from_id(usr._id)
                    console.log(updateduser)
                    globVars.user = updateduser
                    this.props.navigation.navigate('Settings')
                }
                else {
                    Alert.alert("False Input: check your input")
                }
            }
            else {
                Alert.alert("Form Error: Missing Fields")
            }
        }
    }

    render() {
      var user = globVars.user
      console.log(user)

      var saved_username = user.username
      var saved_firstname = user.firstname
      var saved_lastname = user.lastname
      var saved_password = user.password
      var saved_email = user.email
  
      var value = {
          username: `${saved_username}`,
          firstname: `${saved_firstname}`,
          lastname: `${saved_lastname}`,
          email: `${saved_email}`,
          password: `${saved_password}`,
      }
  
      return (
        <View style={styles.container}>
          <ScrollView>
          <Form
            ref="form"
            type={newUser}
            options={options}
            value = {value}
          />
          <TouchableHighlight style={styles.button} onPress={() => {this.onPress(user)}} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Settings')} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Quit</Text>
          </TouchableHighlight>
  
          <Text onPress={this.onPress}>
            {this.props.formStatus}
          </Text>
  
          </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 36,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });

