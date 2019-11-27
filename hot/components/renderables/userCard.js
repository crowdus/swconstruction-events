import React, { Component } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import TagButton from '../renderables/tagButton';

export default class UserCard extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    var person = this.props.person //search function
    var usr = this.props.usr
    const {navigate} = this.props.navigation;
    return (
      <TouchableOpacity style={styles.usr_card} onPress={function () {navigate('UserView', {usr:usr})}}>
        <View style={styles.usr_card}>
            <Text style={styles.usr_fullname}>{item.getFirstName() + item.getLastName}</Text>
            <Text style={styles.usr_username}>{item.getUserName}</Text>
            <Text style={styles.usr_email}>{item.getEmail()}</Text>
            <Text style={styles.usr_desc}>{item.FirstName()}</Text>
            <SafeAreaView style={styles.tags_container}>
                <FlatList
                    horizontal = {true}
                    listKey="going"
                    data={item.get_events_from_userstat(item, "going")}
                    renderItem={({item}) => <UserView n={this.props.navigation} usr={usr}/> }
                    keyExtractor={item => item}
                />
            </SafeAreaView>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  usr_card: {
      padding: 10,
      paddingLeft: 15,
      marginBottom: 10,
      backgroundColor: "#ffe6b5"
  },
  usr_fullname: {
      fontSize:32,
      marginBottom: 5,
  },
  usr_username: {
      color: "#666",

  },
  usr_email: {
      color: "#666",
      marginBottom: 5,

  },
  usr_desc: {
      fontSize: 14,
      marginBottom: 12,
  },
  tags_container: {
    flex: 1,
    padding:10,
  }
})
