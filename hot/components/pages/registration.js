import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView, Button, Alert} from 'react-native';
import t from 'tcomb-form-native';
import User, {isGoodUser, get_user_from_username, constructUser } from '../classes/user.js'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Octicons'

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
      placeholder: 'Must contain at least one letter. No special characters please',
      label: 'Username',
      //maxLength: 100
    },
    firstname: {
      placeholder: 'David',
      label: 'Firstname',
      //maxLength: 100
    },
    lastname: {
      placeholder: 'Johnson',
      label: 'Lastname',
      //maxLength: 100
    },
    email: {
      placeholder:'davidjohnson@gmail.com',
      label: 'Email address',
      //maxLength: 100
    },
    password: {
      placeholder: 'Must contain at least one alphabetical and one numeric character',
      label: 'Password',
      //maxLength: 20
    }
  }
}

export default class Registration extends React.Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = ({navigation}) => {
    return {
        drawerLabel: () => null
    }
  };

  /* onForm Submit function */
  onPress = async () => {
    console.log('Inside Submit Button in Registration!')
    var value = this.refs.form.getValue();
    const checkdup = await get_user_from_username(value.username);
    if("friends" in checkdup){
      Alert.alert('', 'Username taken', 
      [
        { text: 'Retry',
          onPress: () => this.props.navigation.navigate('Registration')
        }
      ]
      )
    }
    else{
      var valid = isGoodUser(value.username, value.firstname, value.lastname, value.email, value.password)
    // console.log('Registration: ' + value.username)
    // console.log(valid)
    if (value) {
      if (valid) {
        var newUser = constructUser(value.username, value.firstname, value.lastname, value.email, new Date().getDate(), value.password, 0, [], [0,0])
        // console.log("success!")
        Alert.alert(
          '',
          'Success! Please log in.',
          [
            { text: 'Return to Login Page',
              onPress: () => this.props.navigation.navigate('LogIn')
            }
          ]
        );
      }
      else {
        // reset form
        console.log("Error! Try Again")
      }
    }
    else{
      console.log("Registration: value was null")
      // reset form
      console.log("Form Error")
    }
  }
}

  render() {
    console.log('Rendering registration page!')
    return (
      <View style={styles.container}>
        <ScrollView>
        <Form
          ref="form"
          type={newUser}
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
