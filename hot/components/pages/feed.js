import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, Icon, TouchableOpacity} from 'react-native';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event';
import EventCard from '../renderables/eventcard'


// the class that renders the keys.
export default class Feed extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {}
    }

    // navigation options displayed at the top of the screen
    static navigationOptions = ({navigation}) => {
        return {
        headerLeft: () =>  (       
            <Button
                onPress={() => alert('Iter2: Take me to settings, lists of events im going/interested/admin, following lists')}
                title="My profile"
                color="#000"
            />
        ),
        headerTitle: () => (
            <Button
                onPress={() => alert('Iter2: Take me to list of events I\'m interested in, going to, or an admin of')}
                title="Explore"
                color="#000"
            />
        ),
        headerRight: () => (
            <Button
                onPress={() => navigation.navigate('CreateEvent', {usr: navigation.getParam('usr')})}
                title="Create event"
                color="#000"
            />
        ),
      };
    };

    // This is called just after the component
    // is first rendered. It changes the data showed there.
    componentDidMount() {

        fetch('http://hot-backend.herokuapp.com/events/', {
            method: 'GET',
        }).then((response) => response.json())
        .then((responseJson) => {
            var l = [];
            for (i in responseJson) {
                i = responseJson[i]
                l.push(new Event(i['_id'], i['name'], i['desc'], i['start_date'], i['end_date'], i['addr'], i['tags'], i['admins']));
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
                <NavigationEvents onDidFocus={()=>this.componentDidMount()} />
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => 
                        <TouchableOpacity style={styles.evt_card} onPress={function () {navigate('Event', {evt:item, usr:usr})}}>
                            <EventCard event={item}></EventCard>
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
    }
});