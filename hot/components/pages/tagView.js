import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event.js';
import Tag from '../classes/tag.js';
import TagButton from '../renderables/tagButton.js';
import User from '../classes/user.js';
import Icon from 'react-native-vector-icons/Octicons'
import EventCard from '../renderables/eventcard'
import {globVars} from '../classes/core.js'
import {change_user_database} from '../classes/user.js'

// the class that renders the keys.
export default class TagView extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {data: [], t: this.props.navigation.getParam('tag')}
    }

    // navigation options displayed at the top of the screen

    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: () => null,
        }
    };

    // This is called just after the component
    // is first rendered. It changes the data showed there.
    componentDidMount() {
        console.log("load tag events")
        fetch('http://hot-backend.herokuapp.com/events/tags/'.concat(this.state.t), {
        method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var l = [];
            for (i in responseJson) {
                i = responseJson[i]
                l.push(new Event(i['_id'], i['name'], i['desc'], i['start_date'], 
                                i['end_date'], i['addr'], i['tags'], i['admins'], 
                                i['loc'], i['isBoosted'], i['hot_level']))
            }
            console.log("changed state")
            this.setState({data: l, t:this.state.t})
        }).catch((error) => {
            console.error(error);
            return false;
        });
    }


    // the render function!
    // Shows the feed
    render() {
        const navigation = this.props.navigation;
        var usr = globVars.user

        return(
            this.state.t && this.state.data && <SafeAreaView>
                <Button 
                    title="Follow"
                    onPress={()=> {usr.follow_tag(this.state.t); console.log(usr.tags);}}
                />
                <NavigationEvents onDidFocus={()=>this.componentDidMount()} />
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
