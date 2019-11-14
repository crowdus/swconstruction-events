import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button} from 'react-native';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>
          Welcome to Hot! 
        </Text> 
        <Button
          title="Start"
          color = "#f194ff"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
  

}