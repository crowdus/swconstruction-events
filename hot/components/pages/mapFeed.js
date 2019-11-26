import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  onPress,
  Alert
} from "react-native";

import MapView from "react-native-maps";
import { BASE_URL, fetch_headers } from "../classes/core";
import User from '../classes/user'

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width*.93;



export default class MapFeed extends Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef();
    usr = new User("5dcd241d8a5d632450dea810", "johndoe1234", "John", "Doe", "johndoe@email.com", new Date(), "Password1234", 0, ['am0002'])
    usr.location = [41.7886, -87.5987]
    this.state = {
      markers: [
        {
          "_id": 0,
          "coordinate": {
            "latitude": 27.802222,
            "longitude": -97.397972,
          },
          "description": "Byo cellos",
          "level": 1,
          "title": "Concert",
        },
        {
          "_id": 1,
          "coordinate": {
            "latitude": 40.7579747,
            "longitude": -73.9855426,
          },
          "description": "Listen",
          "level": 2,
          "title": "Album release party",
        },
        {
          "_id": 2,
          "coordinate": {
            "latitude": 40.7828647,
            "longitude": -73.9653551,
          },
          "description": "Glass",
          "level": 1,
          "title": "Glasz",
        },
        {
          "_id": 3,
          "coordinate": {
            "latitude": 40.7579747,
            "longitude": -73.9855426,
          },
          "description": "Cocoa",
          "level": 3,
          "title": "Noadmin test",
        },
        {
          "_id": 4,
          "coordinate": {
            "latitude": 37.2230876,
            "longitude": -95.70603559999999,
          },
          "description": "A punk",
          "level": 2,
          "title": "A min test",
        },
        {
          "_id": 5,
          "coordinate": {
            "latitude": 37.2230876,
            "longitude": -95.70603559999999,
          },
          "description": "Bambina",
          "level": 1,
          "title": "Tj run",
        },
        {
          "_id": 6,
          "coordinate": {
            "latitude": 41.7909142,
            "longitude": -87.5982633,
          },
          "description": "$1 Shake",
          "level": 2,
          "title": "Chocolate Shake Day",
        },
      ],
      region: {
        latitude: usr.location[0],
        longitude: usr.location[1],
        latitudeDelta: 0.0032,
        longitudeDelta: 0.0032,
      },
    };
    
  }

  /*

  onPressMarker(num){
    this.myRef.scrollTo({x: width*num, y:0, animated: false})
  }

  */
  convertToMarker(eventDict, i){
    return {
        coordinate: {
          latitude: eventDict['loc']['lat'],
          longitude: eventDict['loc']['lng'],
        },
        title: eventDict['name'],
        description: eventDict['desc'],
        _id:i,
        level:eventDict['hot_level'],
    }
  }

  async get_nearby_events_call(usr){
    var usr = new User("5dcd241d8a5d632450dea810", "johndoe1234", "John", "Doe", "johndoe@email.com", new Date(), "Password1234", 0, ['am0002'])
    usr.location = [41.7886, -87.5987]
    this.get_nearby_events(usr, (res) => {
      console.log("got nearby markers!!!")
      var res = [
        {"_id":"5ddad1b43c5e630017ab3edd","refs":{},"updater":{},"name":"Concert","desc":"Byo cellos","start_date":"2019-11-25T18:50:00.000Z","end_date":"2019-12-02T18:50:00.000Z","addr":"Concert street","loc":{"lat":27.802222,"lng":-97.397972},"isBoosted":false,"tags":[],"admins":["johndoe1234"],"points":10, "hot_level": 1},
        {"_id":"5ddad61e3c5e630017ab3ede","refs":{},"updater":{},"name":"Album release party","desc":"Listen\n\n","start_date":"2019-11-25T19:10:00.000Z","end_date":"2019-11-29T19:10:00.000Z","addr":"Times Square","loc":{"lat":40.7579747,"lng":-73.9855426},"isBoosted":false,"tags":[],"admins":["johndoe1234","johndoe12"],"points":10, "hot_level": 2},
        {"_id":"5ddad7823c5e630017ab3edf","refs":{},"updater":{},"name":"Glasz","desc":"Glass","start_date":"2019-11-26T19:10:00.000Z","end_date":"2019-12-04T19:10:00.000Z","addr":"Central park","loc":{"lat":40.7828647,"lng":-73.9653551},"isBoosted":false,"tags":[],"admins":["johndoe1234","testuser"],"points":10, "hot_level": 1},
        {"_id":"5ddadace3c5e630017ab3ee0","refs":{},"updater":{},"name":"Noadmin test","desc":"Cocoa","start_date":"2019-11-25T19:30:00.000Z","end_date":"2019-11-28T19:30:00.000Z","addr":"Times square","loc":{"lat":40.7579747,"lng":-73.9855426},"isBoosted":false,"tags":[],"admins":["testuser"],"points":10, "hot_level": 3},
        {"_id":"5ddadb1d3c5e630017ab3ee1","refs":{},"updater":{},"name":"A min test","desc":"A punk","start_date":"2019-11-25T19:00:00.000Z","end_date":"2019-12-10T19:30:00.000Z","addr":"Main street","loc":{"lat":37.2230876,"lng":-95.70603559999999},"isBoosted":true,"tags":[],"admins":["johndoe12"],"points":10, "hot_level": 2},
        {"_id":"5ddb757f6b514100179086df","refs":{},"updater":{},"name":"Tj run","desc":"Bambina","start_date":"2019-11-26T06:50:00.000Z","end_date":"2019-12-16T06:30:00.000Z","addr":"Main street","loc":{"lat":37.2230876,"lng":-95.70603559999999},"isBoosted":false,"tags":["heybro"],"admins":["johndoe12"],"points":10, "hot_level": 1},
        {"_id":"5ddb7cb7d9c4fad72057fa38","refs":{},"updater":{},"name":"Chocolate Shake Day","desc":"$1 Shake","start_date":"2019-11-26T00:50:03.000Z","end_date":"2019-11-21T01:50:05.000Z","addr":"Reynolds Club","loc":{"lat":41.7909142,"lng":-87.5982633},"isBoosted":false,"tags":[],"admins":["johndoe12"], "hot_level": 3}
      ]
      ctr = 0
      markersConv = res.map((event)=> {
        converted = this.convertToMarker(event, ctr)
        ctr++
        return converted
      })
      console.log(markersConv)
      this.setState({markers: markersConv})
    })
  }


  get_nearby_events(usr, cb){
    fetch(`${BASE_URL}/events?latitude=${usr.location[0]}&longitude=${usr.location[1]}?limit=5`, {
      method: 'GET',
      headers: fetch_headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      cb(responseJson)
    })
    .catch((error) => {
      console.error(error);
      cb(0)
    });
  }
  
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    // Load Events to pass as markers
    var usr = this.props.navigation.getParam('usr')
    this.get_nearby_events_call(usr)
    console.log("got nearby events")
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
    //this.myRef.flashScrollIndicators();
  }

  makeMarkerDescription(){
    return (<Button
      title="Right button"
      onPress={() => this.onPressA()}
    />)
  }

  hotString(x){
    /* get hotness level by seeing how many people going to this event */
    retStr = "!".repeat(x)
    return retStr
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.65, 1, 0.65],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.mapcontainer}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <TouchableOpacity key={marker._id} onPress={() => this.onPressMarker(marker._id)} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                <MapView.Marker key={index} coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={styles.marker}>
                    </View>
                  </Animated.View>
                    <Text>
                    {this.hotString(marker.level)}
                    </Text>
                   
                  
                </MapView.Marker>
              </TouchableOpacity>
            );
          })}
        </MapView>
        <Text styles={{fontSize:200}}>
          Scroll to Explore
        </Text>
        <Animated.ScrollView 
          ref={c => (this.myRef)}
          horizontal = {true}
          scrollEventThrottle={10}
          pagingEnabled = {true}
          bounces={true}
          showsHorizontalScrollIndicator={true}
          snapToInterval={width*.99}
          
          decelerationRate="fast"
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
          
        </Animated.ScrollView>
      </View>
    );
  }
}

const colors = [[131, 43, 186], [255, 81, 0],[255, 0, 0]]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapcontainer: {
    height: height
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "rgba(240,240,240,1)",
    marginHorizontal: 10,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowOffset: { width: -2, height: 2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.9)`
  },
  ring: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.3)`,
    position: "absolute",
    borderWidth: 1,
    borderColor: `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.5)`
  },
});
