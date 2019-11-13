
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const event = t.struct({
  name: t.String,
  description: t.String,
  address: t.String,
  event_Start: t.Date,
  event_End: t.Date,
  tags: t.String,
  admins: t.String
});

export default class CreateEvent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form type={event}/>
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
});