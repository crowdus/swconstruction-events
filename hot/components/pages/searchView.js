import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Octicons'


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
    console.log(this.state.search)
  }

  render() {
    const {search} = this.state;
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});


