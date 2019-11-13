
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView} from 'react-native';
import t from 'tcomb-form-native';
import Event from '../classes/event.js'

const Form = t.form.Form;

const event = t.struct({
  name: t.String,
  description: t.String,
  address: t.String,
  start_date: t.Date,
  end_date: t.Date,
  tags: t.String,
  admins: t.String
});

var options={}

export default class CreateEvent extends Component {
  /*
  constructor(props){
    super(props)
    this.state = {
      formSubmitted: false,
      formStatus = ""
    }
  }*/

  onPress = () => {
    // getValue() gets the values of the form
    var value = this.refs.form.getValue();
    if (value) { 
      var createdEvent = new Event(value)
      if (createdEvent) {
        console.log(createdEvent.props.name)
      }
    }
    else{
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