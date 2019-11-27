import React from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, StyleSheet, Text, TextInput, View, Image, Button, Alert } from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationEvents} from "react-navigation";
import { SearchBar } from 'react-native-elements';
import TagButton from '../renderables/tagButton.js';
import Event from '../classes/event.js';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Octicons';
import EventCard from '../renderables/eventcard';
import {NavigationActions} from 'react-navigation';
import {globVars} from '../classes/core';
import User from '../classes/user.js';


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
        drawerLabel: () => "Search",
    }
  };

  updateSearch = search => {
    this.setState({search});
    fetch(`http://hot-backend.herokuapp.com/search?query=${search}`, {
        method: 'GET',
    }).then((response) => response.json()).then((responseJson) => {
        var eventObjects = responseJson['events'].map(item => new Event(item['_id'],
            item['name'], item['desc'], item['start_date'], item['end_date'], item['addr'],
            item['tags'], item['admins']));
        this.setState({eventData: eventObjects});
        this.setState({userData: responseJson['users']});
    }).catch((error) => {
        console.error(error);
    });
    // console.log(this.state);
  }

  render() {
    const {search} = this.state;
    var usr = this.props.navigation.getParam('usr');
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
          <View style={{padding:10, flexDirection: 'row'}}>
              <Icon
                name='three-bars'
                size={30}
                color='#222'
                onPress={() => this.props.navigation.toggleDrawer()}
              />
              <Text style={{fontSize: 32, alignSelf: 'center', marginTop: -5}}>   Search</Text>
          </View>
          <SearchBar
            placeholder="Type..."
            onChangeText={this.updateSearch}
            value={search}
          />
          <SafeAreaView style={styles.container}>
              <Text>Events</Text>
              <FlatList
                        data={this.state.eventData}
                        renderItem={({item}) =>
                            <EventCard event={item} navigation={this.props.navigation} usr={usr}/>}
              />
          </SafeAreaView>
          <SafeAreaView style={styles.container}>
              <Text>Users</Text>
              <FlatList
                  data={this.state.userData}
                  renderItem={({item}) =>
                      <TouchableOpacity style={styles.evt_card} onPress={() => navigate('UserView', {friend: item, previous: 'search'})}>
                          <View style={styles.evt_card}>
                              <Text style={styles.evt_title}>{item['username']}</Text>
                              <Text style={styles.evt_title}>{item['_id']}</Text>
                          </View>
                      </TouchableOpacity>}
              />
          </SafeAreaView>
      </View>
    )
  }
}

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
