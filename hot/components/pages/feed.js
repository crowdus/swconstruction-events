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
import Icon from 'react-native-vector-icons/Octicons'
import EventCard from '../renderables/eventcard'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

import {globVars} from '../classes/core.js'

// const MenuIcon = ({navigation}) => <Icon
//     name='three-bars'
//     size={30}
//     color='#000'
//     onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//     />;

// the class that renders the keys.
export class Feed extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            loc : null
        }
        this._getLocationAsync();
        this.url = () => {
            return 'http://hot-backend.herokuapp.com/events/'
        };
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          alert.alert("Permission to access location was denied")
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ loc: location });
        globVars.user.set_location(location['coords']['latitude'], location['coords']['longitude'])
      };

    // the render function!
    // Shows the feed
    render() {
        var usr = globVars.user
        
        if (this.state.loc) {
            fetch(this.url(), {
                method: 'GET',
            }).then((response) => response.json())
            .then((responseJson) => {
                var l = [];
                for (i in responseJson) {
                    i = responseJson[i]
                    l.push(new Event(i['_id'], 
                                     i['name'], i['desc'],
                                     i['start_date'], i['end_date'], 
                                     i['addr'], i['tags'], 
                                     i['admins'], i['loc'], 
                                     i['isBoosted'], i['hot_level']));
                }
                this.setState({data:l})
            }).catch((error) => {
                console.error(error);
            });
        }

        return(
            this.state && <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item, index}) =>
                        <EventCard event={item} navigation={this.props.navigation} usr={usr}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }
}

export class AdminEvents extends Feed {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            loc : null
        }
        this.url = () => 'http://hot-backend.herokuapp.com/adminEvents?admin='.concat(globVars.user.getUserName())
    }

}

export class UpcomingEvents extends Feed {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            loc : null
        }
        //this.url = () => "http://hot-backend.herokuapp.com/eventsByStatuses?userId=5de5ba9a4aa7c50017f37677&statuses=[%22going%22,%22interested%22]"
        this.url = () => "http://hot-backend.herokuapp.com/eventsByStatuses?userId=".concat(globVars.user.getUserID()).concat("&statuses=[%22going%22,%22interested%22]");
        console.log(this.url())
    }
}

// styles for the feed.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 100,
    },
    header: {
        padding:10,
        // flex: 1,
        width: 500,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    headerText: {
        // padding:10,
        fontSize: 32,
        alignSelf: 'center'
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
