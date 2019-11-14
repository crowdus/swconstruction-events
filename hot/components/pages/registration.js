import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView} from 'react-native';
import t from 'tcomb-form-native';
import User from '../classes/user.js'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

/* Create Form Structure for the form builder library*/
const Form = t.form.Form;

const newuser = t.struct({
  username: t.String,
  firstname: t.String,
  lastname: t.String,
  email: t.String,
  datejoined: t.Date,
  password : t.String
});

/* Set Form Placeholders and input validation settings */
const currTime = new Date()
var options = {
  fields: {
    name: {
      placeholder: 'David2019',
      label: 'Username',
      maxLength: 100
    },
    firstname: {
      placeholder: 'David',
      label: 'Firstname',
      maxLength: 100
    },
    lastname: {
      placeholder: 'Johnson',
      label: 'Lastname',
      maxLength: 100
    },
    email: {
      placeholder:'davidjohnson@gmail.com',
      label: 'Email address',
      maxLength: 100
    },
    datejoined: {
      label: 'Date Joined',
      minimumDate: currTime,
    },
    password: {
      placeholder: "",
      label: 'Password',
      maxLength: 20
    }
  }
}

export default class CreateUser extends React.Component {
  constructor(props){
    super(props)
  }

  /* onForm Submit function */
  onPress = () => {
    var value = this.refs.form.getValue();
    if (value) { 
      var newUser = new User()
      var checkvalid = newUser.constructionHelper(value)
      if (valid) {
        console.log("success!")
      }
      else {
        // reset form
        console.log("Error! Try Again") 
      }
    }
    else{
      // reset form
      console.log("Form Error")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Form
          ref="form"
          type={newuser}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Create</Text>
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