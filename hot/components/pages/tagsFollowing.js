import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Header, Button, TouchableOpacity} from 'react-native';
import {NavigationEvents} from "react-navigation";
import Event from '../classes/event.js';
import TagButton from '../renderables/tagButton.js';
import User from '../classes/user.js';
import { DrawerActions } from '@react-navigation/routers';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Octicons'

import {change_user_database} from '../classes/user.js';
import { globVars } from '../classes/core.js'



// the class that renders the keys.
export default class TagsFollowing extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = []
    }

    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: () => "Tags You're Following",
        }
    };

    // This is called just after the component
    // is first rendered. It changes the data showed there.
    componentDidMount() {
        this.setState({data: ['sports']});
    }

    // the render function!
    // Shows the feed
    render() {
        const {navigate} = this.props.navigation;
        var usr = globVars.user

        return(
            this.state && <SafeAreaView style={styles.container}>
                <View style={{padding:10, flexDirection: 'row'}}>
                    <Icon
                        name='three-bars'
                        size={30}
                        color='#222'
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />
                    <Text style={{fontSize: 32, alignSelf: 'center', marginTop: -5}}>   Tags Following</Text>
                </View>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                <FlatList
                    data={usr.tags}
                    renderItem={({item}) => 
                    <View style={styles.tagContainer}>
                        <TouchableOpacity style={styles.tagName} onPress={function () {navigate('TagView', {tag:item, usr:usr})}}><Text>{item}</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.followbutton} onPress={async ()=> {usr.unfollow_tag(item); this.setState({'user': usr})} }>
                            <Text>Unfollow</Text>
                        </TouchableOpacity>
                    </View>}
                />
            </SafeAreaView>
        );
    }
}

{/* <TouchableOpacity style={styles.followbutton} onPress={()=> console.log('unfollow '.concat(item))}> */}



// styles for the feed.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: Constants.statusBarHeight,
    },
    followbutton: {
        alignSelf: 'flex-end',
        padding: 10,
        marginRight: 20,
        backgroundColor: '#efefef',
    },
    tagName: {
        alignSelf: 'flex-start', 
        flex:1,
        padding: 10,
        marginLeft: 20,
    },
    tagContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#eee'
    },
});
