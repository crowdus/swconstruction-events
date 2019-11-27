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



// the class that renders the keys.
export default class UsersFollowing extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = []
    }

    // navigation options displayed at the top of the screen
    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: () => "Users Following",
        }
    };

    // This is called just after the component
    // is first rendered. It changes the data showed there.
    componentDidMount() {
        // console.log(globVars.user.friends);
        var friends = [];
        for (i in globVars.user.friends){
            friendid = globVars.user.friends[i];
            friends.push(JSON.stringify(friendid).valueOf());
        }
        friends = Array.from(friends);
        fetch('http://hot-backend.herokuapp.com/users/', {
            method: 'GET',
        }).then((response) => response.json())
        .then((responseJson) => {
            var l = [];
            for (i in responseJson) {
                alluser = responseJson[i]
                check = JSON.stringify(alluser['_id']);
                // console.log(check.valueOf() ===  JSON.stringify(friends[0]).valueOf());
                if(friends.includes(check.valueOf()))
                    l.push(new User(alluser['_id'], alluser['username'], alluser['firstname'], alluser['lastname'], alluser['email'], alluser['datejoined'], alluser['password'], alluser['point'], alluser['friends']));
            }
            this.setState({data:l})
        }).catch((error) => {
            console.error(error);
        });

    }

    // the render function!
    // Shows the feed
    render() {
        const {navigate} = this.props.navigation;
        var usr = this.props.navigation.getParam('usr')

        return(
            this.state && <SafeAreaView>
                <View style={{padding:10, flexDirection: 'row'}}>
                <Icon
                    name='three-bars'
                    size={30}
                    color='#222'
                    onPress={() => this.props.navigation.toggleDrawer()}
                />
                <Text style={{fontSize: 32, alignSelf: 'center', marginTop: -5}}>   Users Following</Text>
                </View>
                <NavigationEvents onDidFocus={()=>this.componentDidMount()} />
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => 
                        <TouchableOpacity style={styles.evt_card} onPress={function () {navigate('UserView', {friend:item, previous: 'following'})}}>
                            <View style={styles.evt_card}>
                                <Text style={styles.evt_title}>{item.getUserName()}</Text>
                            </View>
                        </TouchableOpacity>}
                />
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
