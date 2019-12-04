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
  Alert,
} from "react-native";
import Icon from 'react-native-vector-icons/Octicons'
import MapView from "react-native-maps";
import { BASE_URL, fetch_headers, globVars } from "../classes/core";
import User from '../classes/user'
import EventCard from '../renderables/eventcard'
import Event from '../classes/event'
var dateFormat = require('dateformat');

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width*.97;



export default class MapFeed extends Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef();
    this._getLocationAsync();
    var loc = globVars.user.get_location()
    if (loc.length == 0) {
      loc = [41.7886,-87.5987]
    }
    this.state = {
      region: {
        latitude: loc[0],
        longitude: loc[1],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      loc: {
        latitude: loc[0],
        longitude: loc[1],
      },
      markers: [],
      forceRefresh: 0
    };
  }


  static navigationOptions = {
    drawerLabel: () => null
  }

  static navigationOptions = ({navigation}) => {
    return {
        drawerLabel: () => "Map View",
    }
  };

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
        event: eventDict,
    }
  }

  get_nearby_events_call(){
    this.get_nearby_events((res) => {
      ctr = 0
      markersConv = res.map((event)=> {
        converted = this.convertToMarker(event, ctr)
        ctr++
        return converted
      })
      this.setState({markers: markersConv})
    })
  }


  get_nearby_events(cb){
    var loc = globVars.user.get_location()
    if (loc.length == 0){
      loc = [41.7886,-87.5987] //default to uchicago campus
    }
    console.log(`${BASE_URL}/exploreEvents?userId=${globVars.user.getUserID()}&latitude=${loc[0]}&longitude=${loc[1]}&limit=5000`)
    fetch(`${BASE_URL}/exploreEvents?userId=${globVars.user.getUserID()}&latitude=${loc[0]}&longitude=${loc[1]}&limit=5000`, {
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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert.alert("Permission to access location was denied")
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ loc: location, forceRefresh: Math.floor(Math.random() * 100)});
  };

  componentDidUpdate() {
    //this.get_nearby_events_call()
  }

  async componentDidMount() {
    // Load Events to pass as markers
    var usr = globVars.user
    this.get_nearby_events_call()
    console.log("got initial nearby events")
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

  hotEmojiString(x){
    retStr = `🔥`.repeat(x)
    return retStr
  }

  marker_color(marker_style, marker_ring_style, lvl){
    var colors = globVars.marker_colors
    marker_style['backgroundColor']= `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.9)`
    marker_ring_style['backgroundColor'] = `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.3)`
    marker_ring_style['borderColor'] = `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.5)`
    return [marker_style, marker_ring_style]
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
        <View style={{paddingTop:30, padding:10, marginTop: 10, flexDirection: 'row'}}>
          <Icon
              name='three-bars'
              size={30}
              color='#222'
              onPress={() => this.props.navigation.toggleDrawer()}
          />
          <Text style={{paddingLeft: 10, paddingRight:10}}>
            <Text style={{fontSize: 32, alignSelf: 'center', marginTop: -10}}>  
              Explore Near You
            </Text>
            {"\n"}
            Swipe the cards below to view events near you. Click the cards to learn more.
            If you do not see any cards, there are no events currently near you!
          </Text>
          
        </View>
        <MapView
          key={this.state.forceRefresh}
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
            marker_styles = this.marker_color(styles.marker,styles.ring,marker.lvl)
            var i = marker.event
            var now = new Date().getTime()
            var current = (now > new Date(i['start_date']) && now < new Date(i['end_date']))
            var hotLabel = ""
            if (current){
              hotlabel = this.hotEmojiString(marker.level)
            }
            else {
              hotlabel = ""
            }
            return (
              <TouchableOpacity key={marker._id} onPress={() => this.onPressMarker(marker._id)} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                <MapView.Marker key={index} coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[marker_styles[1], scaleStyle]} />
                    <View style={marker_styles[0]}>
                    </View>
                  </Animated.View>
                    <Text>
                    {hotlabel} 
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
          {this.state.markers.map((marker, index) => {
            var i = marker.event
            var item = new Event(i['_id'], i['name'], i['desc'], i['start_date'], i['end_date'], i['addr'], i['tags'], i['admins'], i['loc'], i['isBoosted'], i['hot_level'])
            var currTime = new Date().getTime()
            var current = (currTime > item.get_start_date() && currTime < item.get_end_date())
            var cardStr = ""
            var renderButton = ""
           
            var card_style = styles.card
            card_style['backgroundColor'] = "white"
            if (current){
              cardStr = `Happening Now. Hot Level: ${this.hotEmojiString(i['hot_level'])}`
              //card_style['backgroundColor'] = "#1ce81c"
              renderButton = (
                <Button
                  title="Check In"
                  color="black"
                  onPress={() => this.props.navigation.navigate('Event', {evt: item})}
                />
              )
            }
            else{
              cardStr = `Starting Soon: ${dateFormat(item.get_start_date(), "h:MM TT")}`
              renderButton = (
                <Button
                title="View"
                color="black"
                onPress={() => this.props.navigation.navigate('Event', {evt: item})}
                />
              )
            }
            
            return (
              <View style={card_style} key={index}>
                <View style={styles.cardImage}>
                  <EventCard event={item} navigation={this.props.navigation}/>
                </View>
                  <View style={styles.cardDescription}>
                    <Text style={{fontStyle:'italic'}}>
                      {cardStr}
                    </Text>
                    {renderButton}
                  </View>
              </View>
            )
            }
          )}
          
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
    padding: 0,
    elevation: 2,
    marginHorizontal: 3,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowOffset: { width: -2, height: 2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardImage: {
    flex: 1,
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
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 20,
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
  },
  ring: {
    width: 25,
    height: 25,
    borderRadius: 25,
    position: "absolute",
    borderWidth: 1,
  },
});
