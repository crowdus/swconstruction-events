/* User Class implementation */

import Followable from './followable';
const fetch = require("node-fetch");
import {BASE_URL, fetch_headers, globVars} from './core';
//import {change_user_database, EditUser} from '../pages/editUser';

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

/*export function standardize(alnumstring){
  var str = new string("")
  for(i = 0, len = alnumstring.length; i < len; i++){
    a = alnumstring.charCodeAt(i);
    //standardize to lowercase
    lowchar = (((a > 64) && (a < 91)) ? (a - 32) : a);
    str[i] = lowchar
  }
  return str;
}

export function basicallysame(userinput, database){
  var inchar, dbchar, a, b;
  if(userinput.length !== database.length) return false;
  for(i = 0, len = userinput.length; i < len; i++){
    a = userinput.charCodeAt(i);
    b = database.charCodeAt(i);
    //standardize to lowercase and compare
    inchar = (((a > 64) && (a < 91)) ? (a - 32) : a);
    dbchar = (((b > 64) && (b < 91)) ? (b - 32) : b);
    if(inchar === dbchar){ continue; } else { return false; }
  }
}*/


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
  username = username.toLowerCase()
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
        username: _user.username.toLowerCase(),
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

export function change_user_database(user){
  // console.log("UPDATE")
  //console.log(JSON.stringify(user))
  user.username = user.username
  fetch(`${BASE_URL}/users/`, {
    method: 'PUT',
    headers: fetch_headers,
    body: JSON.stringify(user)
  })
  .then((response) => response.text())
  .then((responseVal) => {
    return responseVal
  })
  .catch((error) => {
    console.log(error)
    return null
  });   
}


// User Class
export default class User extends Followable {

    constructor(_id, username, firstname, lastname, email, datejoined, password, point, friends, tags) {
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
          this.tags = []
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
          this.tags = tags
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
      _name = _name.toLowerCase()
      var bool = check_valid_name(_name)
      if (!bool)
        return false;
      if (bool){
        async function check(){
          coolfriend = await get_user_from_username(_name);
          if (!(coolfriend)){
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
      if (point < 0){
        return false;
      }
      this.point = point;
      return true;
    }


    // the follow/ unfollow functions are changed during iter2 to be
    // following users based on userid rather than username
    async follow_user(_userid){
      if(_userid == this._id) return false;
      //console.log("inside follow user! i am going to print the cool friend i want to follow:")
      if(_userid === ""){
        return false
      }
      console.log("i'm before i retrieve user from id, inside follow_user")
      coolfriend = await get_user_from_id(_userid);
      console.log("follow_user: retrieving id was successful")
      //console.log(coolfriend)
      //need query to access repeat followed
      if (coolfriend === null){
        console.log("coolfriend did not exist :(")
        console.log(coolfriend)
        return false
      }
      if (this.friends.length === 0){
        //console.log(this.firstname + " has no friends :(")
        this.friends = [_userid];
        return true;
      }
      if (this.friends.includes(_userid)){
        //console.log(this.firstname + " is already following" + coolfriend.firstname)
        return false
      }
      //console.log("about to add coolfriend to list of friends!")
      this.friends.push(_userid);
      return true;
    }

    async unfollow_user(_userid){
      if (_userid == this._id)
        return false
      if (! this.friends.includes(_userid))
        return false
      fakefriend = await get_user_from_id(_userid)
      if (!(fakefriend)){
        return false
      }
      this.friends = this.friends.filter(e => e !== _userid)
      return true
    }
    
    follow_tag(tag){
      if (!this.tags) {
        this.tags = [tag];
        return true;
      }
      if (this.tags.length === 0){
        this.tags = [tag];
        return true;
      }
      else if (this.tags.includes(tag))
        return false
      this.tags.push(tag);
      return true;
    }

    unfollow_tag(tag){
      if (! this.tags.includes(tag))
        return false
      this.tags = this.tags.filter(e => e !== tag)
      return true
    }

    get_status_for_event(event, cb) {
      fetch(`${BASE_URL}/userEvents?userId=${this.getUserID()}&eventId=${event.get_eventID()}`, {
        method: 'GET',
        headers: fetch_headers,
      })
      .then((response) => response.json())
      .then((responseText) => {
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
    get_friends() {
      return this.friends
    }

    set_friends(friend_arr){
      this.friends = friend_arr
    }

    set_location(lat, long) {
      this.location = [lat, long]
      change_user_database(this)
    }

    get_location() {
      //returns the lat long of the user in an array
      return this.location
    }

    addPoint(_event){
      // 1. do we need to check whether an event exists before adding points?
      // 2. also have to check whether this event is created by this user
      // 3. need to double check with event team whether admin is a list of username or list of id
      // 4. when can a person get 2x the points?
      // var points = get_points(_event);
      // this.point += points;
      // return true;

      if(!_event.is_admin(this)){
        this.point += _event.get_points()
        change_user_database(this)
        return true
      }
      return false
    }

    // boost event: when a user chooses to use his point to boost event
    boost_event(_event){
      // 1. how many points can a user use to boost the event?
      // or is it, upon clicking every time, one point is used?
      
      if(this.points <= globVars.points_to_boost){
          this.points -= globVars.points_to_boost
          return true
        } else {
          console.log("not enough points")
          return false
        }
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
