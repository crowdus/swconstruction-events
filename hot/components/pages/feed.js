import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, Icon, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import Event from '../classes/event';

function TagUI({t}) {
    return (
        <View style={styles.tag_view}><Text style={styles.tag_text}>{t}</Text></View>
    );
}

export default class Feed extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = []
    }

    static navigationOptions = {
        headerLeft: () =>  (       
            <Button
                onPress={() => alert('Take me to settings, lists of events im going/interested/admin, following lists')}
                title="My profile"
                color="#000"
            />
        ),
        headerTitle: () => (
            <Button
                onPress={() => alert('Take me to list of events I\'m interested in, going to, or an admin of')}
                title="Explore"
                color="#000"
            />
        ),
        headerRight: () => (
            <Button
                onPress={() => alert('Take me to the create event page')}
                title="Create event"
                color="#000"
            />
        ),
      };

    componentDidMount() {

        fetch('http://hot-backend.herokuapp.com/events/', {
            method: 'GET',
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            var l = [];
            for (i in responseJson) {
                i = responseJson[i]
                l.push(new Event(i['_id'], i['name'], i['desc'], i['date'], i['date'], i['latitude'], i['tags'], i['admin']));
                this.setState({data:l})
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    render() {
        const {navigate} = this.props.navigation;
        return(
            this.state && <SafeAreaView>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => 
                        <TouchableOpacity style={styles.evt_card} onPress={function () {navigate('Event', {event:item})}}>
                            <View style={styles.evt_card}>
                                <Text style={styles.evt_title}>{item.get_name()}</Text>
                                <Text style={styles.evt_date}>{item.get_start_date()} - {item.get_end_date()}</Text>
                                <Text style={styles.evt_addr}>{item.get_address()}</Text>
                                <Text style={styles.evt_desc}>{item.get_desc()}</Text>
                                <SafeAreaView style={styles.tags_container}>
                                    <FlatList
                                        horizontal = {true}
                                        listKey="tags"
                                        data={item.get_tags()}
                                        renderItem={({item}) => <TagUI t={item}/> }
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
