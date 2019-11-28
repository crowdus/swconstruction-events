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
import EditUser, {change_user_database} from './editUser.js'
import { isGoodUser, get_user_from_id } from '../classes/user';

export default class ProfileView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
  
    static navigationOptions = ({navigation}) => {
      return {
          drawerLabel: () => "Your Profile",
      }
    };
  
    // componentDidMount() {
    //   var e = this.props.navigation.getParam('friend')
    //   var user = this.props.navigation.getParam('usr')
    // }
  
    render() {
      var user = globVars.user
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
              {user.username} {"\n"}
            </Text>
          </View>
            <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
              <Text>
                Username:{"  "}{user.username}
              </Text>
            </View>
            <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
              <Text>
                First Name:{"  "}{user.firstname}
              </Text>
            </View>
            <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
              <Text>
                Last Name:{"  "}{user.lastname}
              </Text>
            </View>
            <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
              <Text>
                Email Address:{"  "}{user.email}
              </Text>
            </View>
            <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
              <Text>
                Points: {"  "} {user.point}
              </Text>
            </View>
            <View style={{ flex: 4, flexDirection: "column", justifyContent: "left", alignItems: "center" }}>
            <Text>
              {"\n\n"}
            </Text>
            <Button
                title="Edit"
                color="#f194ff"
                onPress={ () => {navigate('EditUser')}}
            />
          </View>
          <View style={{ flex: 4, flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
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
  