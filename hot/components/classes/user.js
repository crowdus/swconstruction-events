/* User Class implementation */

import Followable from './followable';
const fetch = require("node-fetch");
import {BASE_URL, fetch_headers} from './core'

// Validation Functions
export function check_valid_name(str){
  if (str == "")
    return false;
  if (typeof str === 'number')
    return false;
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

export function check_valid_email(email){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function check_valid_password(password){
  if (password.length < 10)
    return false;
  //return (password!= null) && (password.match("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[A-Z0-9]+$"));
  var code, i, len;
  var lower = 0;
  var upper = 0;
  var num = 0;
  for (i = 0, len = password.length; i < len; i++) {
    code = password.charCodeAt(i);
    if (code > 47 && code < 58) num ++;
    if (code > 64 && code < 91) upper++;
    if (code > 96 && code < 123) lower++;
  }
  if ((num >0) && (upper > 0) && (lower >0))
    return true;
  return false;
}


// Returns user object given a user ID
export async function get_user_from_id(userid) {
  /* Make call to our API */
  try{
    const response = await fetch (`${BASE_URL}/users/${userid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }})
    const json = response.json()
    return json;
  }
  catch(err){
    console.log(err)
    return null;
  }
  return null;
}

export async function get_user_from_username(username) {
  try {
    /* Make call to our API */
      const response = await fetch(`${BASE_URL}/queryUserByUsername?username=${username}`, {
        method: 'GET',
        headers: fetch_headers})
      const json = response.json()
      return json;
    }
  catch(err){
    console.log(err)
    return null;
  }
  return null;

}

export async function get_user_from_email(email) {
  /* Make call to our API */
  try{
    const response = await fetch(`${BASE_URL}/queryUserByEmail?email=${email}`, {
    method: 'GET',
    headers: fetch_headers,
  })
    const json = response.json()
    return json;
  }
  catch(err){
    console.log(err)
    return null
  }
  return null
}

export async function get_events_from_userstat(userID, status) {
  try{
    const response = await fetch(`${BASE_URL}/userEvents/users/${userID}/${status}`, {
        method: 'GET',
        headers: fetch_headers})
      const json = response.json()
      return json;
    }
  catch(err){
    console.log(err)
    return null;
  }
  return null;
}

export async function get_events_from_admin(username) {
  try{
    const response = await fetch(`${BASE_URL}/adminEvents?admin=${username}`, {
        method: 'GET',
        headers: fetch_headers})
      const json = response.json()
      return json;
    }
  catch(err){
    console.log(err)
    return null;
  }
  return null;
}

export async function setUserID(_user){
  // console.log(_user.username);
  try{
    const response = await fetch(`${BASE_URL}/users/`, {
      method: 'POST',
      headers: fetch_headers,
      body: JSON.stringify({
        username: _user.username,
        firstname: _user.firstname,
        lastname: _user.lastname,
        email: _user.email,
        datejoined: _user.datejoined,
        password: _user.password,
        friends: _user.friends,
        point: _user.point
      }),
    });
    new_user = await get_user_from_username(_user.username);
    // console.log(new_user);
    _user._id = new_user._id;
    return true;
  }
  catch(err){
    console.log(err)
    return null;
  }
  return null;
}


export async function constructUser(username, firstname, lastname, email, datejoined, password, point, friends){
  const auser = new User(null, username, firstname, lastname, email, datejoined, password, point, friends)
  await setUserID(auser);
  // console.log(auser);
  // await setUserID(auser);
  return auser;
}

export function isGoodUser(username, firstname, lastname, email, password){
  return check_valid_name(username) &&
         check_valid_name(firstname) &&
         check_valid_name(lastname) &&
         check_valid_email(email) &&
         check_valid_password(password);
}


// User Class
export default class User extends Followable {

    constructor(_id, username, firstname, lastname, email, datejoined, password, point, friends) {
        super()
        // Validate Attributes
        var goodUser = isGoodUser(username, firstname, lastname, email, password)
        // check_valid_name(username) &&
        //                  check_valid_name(firstname) &&
        //                  check_valid_name(lastname) &&
        //                  check_valid_email(email) &&
        //                  check_valid_password(password);
        if (!goodUser) {
          this._id = ""
          this.username = ""
          this.firstname = ""
          this.lastname = ""
          this.email = ""
          this.datejoined = null
          this.password = ""
          this.point = 0
          this.friends = []
          this.location = [0,0]
        }
        else{
          this._id = _id
          this.username = username
          this.firstname = firstname
          this.lastname = lastname
          this.email = email
          this.datejoined = new Date (datejoined)
          this.password = password
          this.point = point
          this.friends = friends
          this.location = []
      }
    }

    // Getters and Setters
    getUserID() {return this._id;}
    getUserName() {return this.username}
    getFirstName() {return this.firstname;}
    getLastName() {return this.lastname;}
    getEmail() {return this.email;}
    getDateJoined() {return this.datejoined;}
    getPassword() {return this.password;}
    getPoint() {return this.point;}

    setID(_id) {this._id = _id;}

    async setUserName(_name) {
      var bool = check_valid_name(_name)
      if (!bool)
        return false;
      if (bool){
        async function check(){
          coolfriend = await get_user_from_username(_name);
          if (!("friends" in coolfriend)){
            return true
          }
          else if (coolfriend._id == this._id)
            return true
          return false
        }
        var result = await check();
        if (result){
          this.username = _name
        }
        return result;
      }
    }

    setFirstName(_firstname) {
      if (check_valid_name(_firstname)){
        this.firstname = _firstname;
        return true;
      }
      return false;
    }
    setLastName(_lastname) {
      if (check_valid_name(_lastname)){
        this.lastname = _lastname;
        return true;
      }
      return false;
    }
    async setEmail(_email) {
      var bool = check_valid_email(_email)
      if(!bool)
        return false;
      if (bool){
        async function check(){
          coolfriend = await get_user_from_email(_email);
          if (!("friends" in coolfriend)){
            return true
          }
          return false
        }
      var result = await check();
        if (result)
          this.email = _email
        return result;
      }
    }



    setDateJoined(_date) {
      if (_date == "")
        return false;
      this.datejoined = _date
      return true;
    }

    setPassword(_password) {
      if (check_valid_password(_password)){
        this.password = _password;
        return true;
      }
      return false;
    }

    setPoint(point){
      if (point <0){
        return false;
      }
      this.point = point;
      return true;
    }


    // the follow/ unfollow functions are changed during iter2 to be
    // following users based on userid rather than username
    async follow_user(_userid){
      if(_userid == this._id) return false;
      coolfriend = await get_user_from_id(_userid);
      //need query to access repeat followed
      if (!("friends" in coolfriend)){
        return false
      }
      if (this.friends.length === 0){
        this.friends = [_userid];
        return true;
      }
      if (this.friends.includes(_userid))
        return false
      this.friends.push(_userid);
      return true;
    }

    async unfollow_user(_userid){
      if (_userid == this._id)
        return false
      if (! this.friends.includes(_userid))
        return false
      fakefriend = await get_user_from_id(_userid)
      if (! ("friends" in fakefriend)){
        return false
      }
      this.friends = this.friends.filter(e => e !== _userid)
      return true
    }

    get_status_for_event(event, cb) {
      console.log(`${BASE_URL}/userEvents?userId=${this.getUserID()}&eventId=${event.get_eventID()}`)
      fetch(`${BASE_URL}/userEvents?userId=${this.getUserID()}&eventId=${event.get_eventID()}`, {
        method: 'GET',
        headers: fetch_headers,
      })
      .then((response) => response.json())
      .then((responseText) => {
          console.log("got status for event")
          cb(responseText)
      })
      .catch((error) => {
          console.error(error)
          cb(null)
      });
    }


    follow_event(_event, status){
      if(get_event_from_id(_event.eventid)!= null){
        _event.addFollower(this, status);
      }
    }

    unfollow_event(_event){
      if(get_event_from_id(_event.eventid)!= null){
        _event.removeFollower(this);
      }
    }

    get_interested_events(){
      //calculate the events that user clicked interested to using the UserID
      var arr = get_events_from_userstat(this.userID, "interested")
      return arr.map(x =>  x.eventid)
    }

    get_going_events(){
      //calculate the events that user clicked going to using the UserID
      var arr = get_events_from_userstat(this.userID, "going")
      return arr.map(x =>  x.eventid)
    }

    get_admin_events(){
      //calculate the events that user created
      var eventarr = get_event_from_admin(this.username)
      if(eventarr === null) return false;
      return eventarr.map(x => x.eventid);
    }

    // FUNCTIONS THAT ARE IMPLEMENTED IN ITERATION 2
    // add point: when a user checks in for certain events, he will get certain
    // number of points

    set_location(lat, long) {
      this.lat = lat
      this.long = long
    }

    get_location() {
      //returns the lat long of the user in an array
      return [0, 0]
    }

    addPoint(_event){
      // 1. do we need to check whether an event exists before adding points?
      // 2. also have to check whether this event is created by this user
      // 3. need to double check with event team whether admin is a list of username or list of id
      // 4. when can a person get 2x the points?
      // var points = get_points(_event);
      // this.point += points;
      // return true;
      return true;
    }

    // boost event: when a user chooses to use his point to boost event
    boost_event(_event){
      // 1. how many points can a user use to boost the event?
      // or is it, upon clicking every time, one point is used?

      return true;
    }


    async get_friends_attending(eventid,status){
      // get the list of friends interested in or going to the event
      try{
        const response = await fetch(`${BASE_URL}/queryFriendsAttendingEvent/${this._id}/${eventid}/${status}`, {
          method: 'GET',
          headers: fetch_headers})
        const json = response.json()
        return json;
        }
      catch(err){
        console.log(err)
        return null;
      }
      return null;
    }

    checkIn(event){
      return true;
    }
}
