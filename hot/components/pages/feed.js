import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import Event from '../classes/event';

e = new Event("Event Title", "This will be a very fun event. You should come. I'm going to add more text so we get a new line. Maybe even a third line,,, etc.",
              new Date("2019-12-17T03:24:00"), new Date("2019-12-17T03:24:00"), "5336 S Greenwood Ave", ["tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "asdf", "asdf", "asdf"], null);
e1 = new Event("Checkout Books", "This event will have a lot of food. It will be fun. asdf asdf asdf asdf asdf asdf asdf asdf .",
               new Date("2019-12-17T03:24:00"), new Date("2019-12-17T03:24:00"), "The Reg", ["tag3"], null);

function TagUI({t}) {
    return (
        <View style={styles.tag_view}><Text style={styles.tag_text}>{t}</Text></View>
    );
}

function ScrollEventUI({e}) {
    return (
        <View style={styles.evt_card}>
            <Text style={styles.evt_title}>{e.get_name()}</Text>
            <Text style={styles.evt_date}>{e.get_start_date().toDateString()} - {e.get_end_date().toDateString()}</Text>
            <Text style={styles.evt_addr}>{e.get_address()}</Text>
            <Text style={styles.evt_desc}>{e.get_desc()}</Text>
            <SafeAreaView style={styles.tags_container}>
                <FlatList
                    horizontal = {true}
                    listKey="tags"
                    data={e.get_tags()}
                    renderItem={({item}) => <TagUI t={item}/> }
                    keyExtractor={item => item}
                />
            </SafeAreaView>
        </View>
    );
}
//<Text style={styles.evt_tags}>{e.get_tags()}</Text>

export default class Intro extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={[e, e1, e, e, e, e, e, e, e, e]}
                    renderItem={({item}) => <ScrollEventUI e={item}/> }
                    keyExtractor={item => item.get_name()}
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