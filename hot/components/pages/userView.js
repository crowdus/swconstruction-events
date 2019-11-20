import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import User from '../classes/user.js';

//userTA is the person we are viewing
export var userTA = new User("5dcd241d8a5d632450dea810", "johndoe1234", "John", "Doe", "johndoe@email.com", new Date(), "Password1234", 0, ['am0002'])
export var viewerfriend = new User("5dcd241d8a5d632450dea811", "johnsfriend", "Jiayi", "Lin", "jiayilin@gmail.com", new Date(), "Password1234", 0, ['am0002'])

export default class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: userTA,
      viewer: viewerfriend,
      /*UNisInEditMode: false,
      FNisInEditMode: false,
      LNisInEditMode: false,
      emailIsInEditMode: false,
      passwordIsInEditMode: false,*/
      EditMode : false
    }
  }

  render() {
    console.log("hello")
    console.log(this.state.user)
    console.log(this.state.viewer)
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: "left", alignItems: "center" }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
        </View>
        <View style={{ flex: 2, flexDirection: "column", justifyContent: "left", alignItems: "center" }}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
            {this.state.user.username} {"\n"}
          </Text>
          <Button
            title="Follow"
            color="#f194ff"
            onPress={ () => {
              if (this.state.viewer.friends.includes(this.state.user.userID)) {
                Alert.alert("You already follow this user!")
              }
              else {
                this.state.viewer.follow_user(this.state.user.userID)
              }
            }}
          />
          <Button
            title="Unfollow"
            color="#f194ff"
            onPress={ () => {
              if (!this.state.viewer.friends.includes(this.state.user.userID)) {
                Alert.alert("You are not following this user!")
              }
              else {
                this.state.viewer.unfollow_user(this.state.user.userID)
              }
            }}
          />
          <Text>
            {"\n\n"}
          </Text>
        </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Username:{"  "}{this.state.user.username}
            </Text>
          </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              First Name:{"  "}{this.state.user.firstname}
            </Text>
          </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Last Name:{"  "}{this.state.user.lastname}
            </Text>
          </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Email Address:{"  "}{this.state.user.email}
            </Text>
          </View>
          <View style={{ flex: 0.25, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Score: {"  "} {this.state.user.point}
            </Text>
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
