import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event.js';
import Tag from '../classes/tag.js';
import TagButton from '../renderables/tagButton.js';
import User from '../classes/user.js';
import { DrawerActions } from '@react-navigation/routers';
import Settings from './settings.js'
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Octicons';
import {globVars} from '../classes/core';
import UserCard from '../renderables/usercard.js';
import EventCard from '../renderables/eventcard.js';


// the class that renders the keys.
export default class ViewListUsers extends Component {

    constructor(props) {
        super(props)
        this.props = props
    }

    // navigation options displayed at the top of the screen
    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: () => null,
        }
    };

    render() {
        var userList = this.props.navigation.getParam('userList')
        return(
            <SafeAreaView>
                {userList.length == 0 ? <Text style={{fontSize: 20, fontStyle: 'italics'}}> No Users to Show </Text> : 
                    <FlatList
                    data={userList}
                    renderItem={({item}) => {
                      return (<UserCard usr={item} n={this.props.navigation} before="Feed"/>)
                    }}
                    />
                }
                
            </SafeAreaView>
        );
    }
}

// styles for the feed.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
    },
    header: {
        flex: 1,
        padding:10,
    },
    tags_container: {
        flex: 1,
        padding:10
    },
    evt_card: {
        padding: 10,
        paddingLeft: 15,
        marginBottom: 10,
        backgroundColor: "#eee"
    },
    evt_title: {
        fontSize:32,
        marginBottom: 5,
    },
    evt_date: {
        color: "#666",

    },
    evt_addr: {
        color: "#666",
        marginBottom: 5,

    },
    evt_desc: {
        fontSize: 14,
        marginBottom: 12,
    },
    tag_view: {
        padding: 5,
        paddingLeft: 7,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 2,
        backgroundColor: "#e5e5e5"
    },
    tag_text: {
        fontSize: 10,
        color: "#666",
    }
});
