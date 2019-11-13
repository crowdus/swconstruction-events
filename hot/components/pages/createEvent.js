
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView} from 'react-native';
import t from 'tcomb-form-native';
import Event from '../classes/event.js'

/* Create Form Structure for the form builder library*/
const Form = t.form.Form;

const event = t.struct({
  name: t.String,
  description: t.String,
  address: t.String,
  start_date: t.Date,
  end_date: t.Date,
  tags: t.maybe(t.String),
  admins: t.maybe(t.String)
});

/* Set Form Placeholders and input validation settings */
const currTime = new Date()
var options = {
  fields: {
    name: {
      placeholder: 'Hot Chocolate Study Break',
      label: 'Event Name',
      maxLength: 100
    },
    description: {
      placeholder: 'Meet us over Hot Cocoa!',
      maxLength: 1000,
      multiline: true,
      numberOfLines: 2
    },
    address: {
      placeholder: "123 Main Street",
      maxLength: 500,
      multiline: true,
      numberOfLines: 2
    },
    start_date: {
      initialDate: currTime,
      minimumDate: currTime,
      minuteInterval: 10,
    },
    end_date: {
      minimumDate: currTime,
      minuteInterval: 10,
    },
    tags: {
      placeholder: "study,chocolate,..."
    },
    admins: {
      placeholder: "user1,user2,..."
    }
  }
}

export default class CreateEvent extends React.Component {
  constructor(props){
    super(props)
  }

  /* onForm Submit function */
  onPress = () => {
    var value = this.refs.form.getValue();
    if (value) { 
      var newEvent = new Event()
      var valid = newEvent.consHelper(value)
      if (valid) {
        console.log("success!")
        console.log(newEvent)
        // redirect to newly created event page
      }
      else {
        // reset form
        console.log(newEvent)
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
          type={event}
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