import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import TagButton from '../renderables/tagButton';

export default class EventCard extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    var item = this.props.event
    return (
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
                  renderItem={({item}) => <TagButton t={`#${item}`}/> }
                  keyExtractor={item => item}
              />
          </SafeAreaView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  evt_card: {
      padding: 10,
      paddingLeft: 15,
      marginBottom: 10,
      backgroundColor: "#ffe6b5"
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
  tags_container: {
    flex: 1,
    padding:10,
  }
})
