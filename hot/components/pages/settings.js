import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import User from '../classes/user.js';

export var userTA = new User("5dcd241d8a5d632450dea810", "johndoe1234", "John", "Doe", "johndoe@email.com", new Date(), "Password1234", 0, ['am0002'])

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: userTA,
      /*UNisInEditMode: false,
      FNisInEditMode: false,
      LNisInEditMode: false,
      emailIsInEditMode: false,
      passwordIsInEditMode: false,*/
      EditMode : false
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
        drawerLabel: () => "Profile",
    }
  };

  render() {
    console.log("hello")
    console.log(this.state.user)
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: "left", alignItems: "center" }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
        </View>
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "left", alignItems: "center" }}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
            User Settings Page {"\n"}
          </Text>
          <Button
            title="Edit"
            color="#f194ff"
            onPress={ () => {
              if (!this.state.EditMode) {
                this.state.EditMode = !this.state.EditMode
              }
              else {
                Alert.alert("Already Editing")
              }
            }}
          />
          <Text>
            {"\n\n"}
          </Text>
        </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Username:{"  "}
            </Text>
            <TextInput
              placeholder="Username"//{this.state.user.getUserName()}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
          </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              First Name:{"  "}
            </Text>
            <TextInput
              placeholder="First Name"//{this.state.user.getFirstName()}
              onChangeText={(fname) => this.setState({fname})}
              value={this.state.user.firstname}
            />
          </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Last Name:{"  "}
            </Text>
            <TextInput
              placeholder="Last Name"//{this.state.user.getLastName()}
              onChangeText={(lname) => this.setState({lname})}
              value={this.state.user.lastname}
            />
          </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Email Address:{"  "}
            </Text>
            <TextInput
              placeholder="Email Address"//{this.state.user.getEmail()}
              onChangeText={(email) => this.setState({email})}
              value={this.state.user.email}
            />
          </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Password:{"  "}
            </Text>
            <TextInput
              placeholder=""
              onChangeText={(password) => this.setState({password})}
              value={this.state.user.password}
            />
          </View>
          <View style={{ flex: 5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
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
