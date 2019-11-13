import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import Event from '../classes/event';

e = new Event(1, "Event Title", "This will be a very fun event. You should come. I'm going to add more text so we get a new line. Maybe even a third line,,, etc.",
              new Date("2019-12-17T03:24:00"), new Date("2019-12-17T03:24:00"), "5336 S Greenwood Ave", ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "antidisestablishmentarianism"], null);
e1 = new Event(2, "Checkout Books", "This event will have a lot of food. It will be fun. asdf asdf asdf asdf asdf asdf asdf asdf .",
               new Date("2019-12-17T03:24:00"), new Date("2019-12-17T03:24:00"), "The Reg", ["tag3"], null);

function TagUI({t}) {
    return (
        <View style={styles.tag_view}><Text style={styles.tag_text}>{t}</Text></View>
    );
}

function ScrollHeader({usr}) {
    // machine icon (account info button)
    // globe icon (nearby)
    // crowd icon (subscribed)
    // single person icon (going/interested/admin)
    // plus icon (create event)
    return (
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        />
    )
}

function ScrollViewEvent({e}) {
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

export default class Feed extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={[e, e1]}
                    renderItem={({item}) => <ScrollViewEvent e={item}/> }
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
