import React, { Component } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import TagButton from '../renderables/tagButton';
import { globVars } from '../classes/core';

export default class EventCard extends React.Component{
  constructor(props) {
    super(props)
  }

  create_event_styles(color){
    return {
      padding: 10,
      paddingLeft: 15,
      marginBottom: 10,
      backgroundColor: `${color}`
    }
  }

  render() {
    var item = this.props.event
    const {navigate} = this.props.navigation;
    var usr = globVars.user
    var hot_idx = item.get_hot_level() - 1
    var color = globVars.hot_colors[hot_idx]
    if (new Date().getTime() < item.get_start_date()){
      hot_idx = -1
      color = "#f0f2f2"
    }
    var evt_card = this.create_event_styles(color)

    return (
      <TouchableOpacity style={evt_card} onPress={() => {console.log(this.props.navigation.state); this.props.navigation.navigate('Event2', {evt:item})}}>
        <View style={evt_card}>
            <Text style={styles.evt_title}>{item.get_name()}</Text>
            <Text style={styles.evt_date}>{item.get_start_date().toDateString()} - {item.get_end_date().toDateString()}</Text>
            <Text style={styles.evt_addr}>{item.get_address()}</Text>
            <Text style={styles.evt_desc}>{item.get_desc()}</Text>
            <SafeAreaView style={styles.tags_container}>
                <FlatList
                    horizontal = {true}
                    listKey="tags"
                    data={item.get_tags()}
                    renderItem={({item}) => <TagButton t={item} n={this.props.navigation} usr={usr} lvl_idx={hot_idx}/> }
                    keyExtractor={item => item}
                />
            </SafeAreaView>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
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
  tags_container: {
    flex: 1,
    padding:10,
  }
})
