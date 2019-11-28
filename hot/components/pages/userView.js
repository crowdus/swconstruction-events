import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import User from '../classes/user.js';
import Icon from 'react-native-vector-icons/Octicons'
import {globVars} from '../classes/core';
import {change_user_database} from '../classes/user.js'
import { isGoodUser, get_user_from_id } from '../classes/user';

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
      // EditMode : false
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
        drawerLabel: () => "User View",
    }
  };

  componentDidMount() {
    var e = this.props.navigation.getParam('friend')
    var user = this.props.navigation.getParam('usr')
  }

  render() {
    var e = this.props.navigation.getParam('friend')
    var previous = this.props.navigation.getParam('previous')
    var user = globVars.user
    // console.log(e)
    console.log(user)
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: "left", alignItems: "center" }}>
        <View style={{ flex: 3, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
        </View>
        <View style={{padding:10, flexDirection: 'row'}}>
          <Icon
              name='three-bars'
              size={30}
              color='#222'
              onPress={() => this.props.navigation.toggleDrawer()}
          />
          <Text style={{fontSize: 32, alignSelf: 'center', marginTop: -5}}>   User</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
            {e.username} {"\n"}
          </Text>
        </View>
          <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Username:{"  "}{e.username}
            </Text>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              First Name:{"  "}{e.firstname}
            </Text>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Last Name:{"  "}{e.lastname}
            </Text>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Email Address:{"  "}{e.email}
            </Text>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
            <Text>
              Score: {"  "} {e.point}
            </Text>
          </View>
          <View style={{ flex: 4, flexDirection: "column", justifyContent: "left", alignItems: "center" }}>
          <Button
            title="Follow"
            color="#f194ff"
            onPress={ async () => {
              console.log(user.friends)
              var converted_user = new User (user._id, user.username, user.firstname, user.lastname, user.email, user.datejoined, user.password, user.point, user.friends)
              var checkfollow = converted_user['friends'].includes(e._id)
              console.log(checkfollow);
              if (checkfollow) {
                Alert.alert("You already follow this user!")
              }
              else {
                // var converted_user = new User(user._id, user.username, user.firstname, user.lastname, user.email, user.datejoined, user.password, user.point, user.friends)
                // console.log(converted_user)
                const value = await converted_user.follow_user(e._id);
                // console.log("This is value" + value)
                if (value){
                  // console.log(converted_user)
                  var result = await change_user_database(converted_user)
                  globVars.user = await get_user_from_id(user._id)
                  user = globVars.user
                  console.log(user.friends)
                  Alert.alert("Successfully followed!")
                }
                else Alert.alert("Following fails. Try Again!")
              }
            }}
          />
          <Button
            title="Unfollow"
            color="#f194ff"
            onPress={ async () => {
              console.log(user.friends)
              var converted_user = new User (user._id, user.username, user.firstname, user.lastname, user.email, user.datejoined, user.password, user.point, user.friends)
              var checkfollow = converted_user['friends'].includes(e._id)
              console.log(checkfollow)
              if (!checkfollow){
                Alert.alert("You are not following this user!")
              }
              else{
                const value = await converted_user.unfollow_user(e._id)
                if (value){
                  var result = await change_user_database(converted_user)
                  globVars.user = await get_user_from_id(user._id)
                  user = globVars.user
                  console.log(user.friends)
                  Alert.alert("Successfully unfollow!")
                }
                else Alert.alert("Unfollow fails. Try again!")
              }
            }}
          />
          <Text>
            {"\n\n"}
          </Text>
        </View>
        <View style={{ flex: 4, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
          <Button
          title="Back"
          color="#f194ff"
          onPress={ () => {
            if (previous == 'search')
              navigate('Search')
            else if (previous == 'following')
              navigate('UsersFollowing')}}
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
