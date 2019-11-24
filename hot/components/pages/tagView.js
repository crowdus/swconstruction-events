import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, Icon, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event.js';
import Tag from '../classes/tag.js';
import TagButton from '../renderables/tagButton.js';
import User from '../classes/user.js';



// the class that renders the keys.
export default class TagView extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.t = new Tag(0, this.props.navigation.getParam('tag'))
        this.state = {data: []}
    }

    // navigation options displayed at the top of the screen

    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: () => null
        }
    };

    // This is called just after the component
    // is first rendered. It changes the data showed there.
    componentDidMount() {
        fetch('http://hot-backend.herokuapp.com/events/tags/'.concat(this.t.name), {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var l = [];
            for (i in responseJson) {
                i = responseJson[i]
                console.log(i)
                l.push(new Event(i['_id'], i['name'], i['desc'], 
                                 i['start_date'], i['end_date'], 
                                 i['addr'], i['tags'], i['admins']));
            }
            this.setState({data:l});
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        });

        //const {navigate} = this.props.navigation;
        //const t = new Tag(0, this.props.navigation.getParam('tag'))
        //this.setState({data: t.get_events()})

    }

    // the render function!
    // Shows the feed
    render() {
        console.log("hello tagview")
        const {navigate} = this.props.navigation;
        var usr = this.props.navigation.getParam('usr')

        return(
            this.state && <SafeAreaView>
                <NavigationEvents onDidFocus={()=>this.componentDidMount()} />
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>
                        <TouchableOpacity style={styles.evt_card} onPress={function () {navigate('Event', {evt:item, usr:usr})}}>
                            <View style={styles.evt_card}>
                                <Text style={styles.evt_title}>{item.get_name()}</Text>
                                <Text style={styles.evt_date}>{item.get_start_date().toDateString()} - {item.get_end_date().toDateString()}</Text>
                                <Text style={styles.evt_addr}>{item.get_address()}</Text>
                                <Text style={styles.evt_desc}>{item.get_desc()}</Text>
                                <SafeAreaView style={styles.tags_container}>
                                    <FlatList
                                        horizontal = {true}
                                        listKey="tags"
                                        data={item.get_tags()}
                                        renderItem={({item}) => 
                                            <TagButton t={item} n={this.props.navigation} usr={usr}/>}
                                        keyExtractor={item => item}
                                    />
                                </SafeAreaView>
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
