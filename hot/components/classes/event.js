/* Event class implementation */

import Followable from './followable';
import Geocoder from 'react-native-geocoding';
import {BASE_URL, fetch_headers} from './core'

const MAX_TAGS = 5

// Validation Functions 
function is_valid_name(new_name){
    var new_len = new_name.length
    return (new_len > 0 && new_len <= 128) 
}

function is_valid_desc(new_desc){
    var new_len = new_desc.length
    return new_len <= 1000
}

function is_valid_date_pair(start_date, end_date){
    return (start_date < end_date)
}

export function is_valid_addr(addr, cb){
    Geocoder.from(addr)
    .then(json => {
        var location = json.results[0].geometry.location;
        console.log("LOOOOCATION")
        console.log(location)
        cb(location)
    })
    .catch(() => {
        event.set_null()
        cb(null)
    })
}

// Gets location from address string
export function get_loc_from_addr(new_addr, event, cb){
    Geocoder.from(new_addr)
    .then(json => {
        var location = json.results[0].geometry.location;
        event.set_loc(location)
        cb(location)
    })
    .catch((error) => {
        //console.error(error)
        event.set_null()
        cb(null)
    })
}


// Returns event object given an event ID
export function get_event_from_id(eventid, cb) {
    /* Make call to our API */
    fetch(`${BASE_URL}/events/${eventid}`, {
      method: 'GET',
      headers: fetch_headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      cb(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  
/* 
Note: Javascript does not support function overloading, I cannot
have more than 1 constructor
*/
export default class Event extends Followable {

    constructor(_id, name, desc, start, end, addr, tags, admins, loc=null, boost=false, hot_level=1) {
        super()
        var isGoodEvent = is_valid_name(name) && 
                          is_valid_desc(desc) &&
                          is_valid_date_pair(start, end)
        // Validate Attributes
        this._id = _id
        this.name = name
        this.desc = desc
        this.start_date = new Date(start)
        this.end_date = new Date(end)
        this.addr = addr
        this.loc = loc
        this.isBoosted = boost
        this.tags = tags
        this.admins = admins
        this.hot_level=hot_level

        if (!isGoodEvent) {
            this.set_null()
        }
    }

    // Set an event to a null instance of event
    set_null(){
        this._id = ""
        this.name = ""
        this.desc = ""
        this.start_date = null
        this.end_date = null
        this.addr = ""
        this.loc = null
        this.isBoosted = null
        this.tags = []
        this.admins = []
        this.points = null
    }

    // Checks if an event is a null instance of event
    is_null_event(){
        return (this.name == "" 
             && this.addr == ""
             && this.start_date == null
             && this.end_date == null
             && this.isBoosted == null)
    }

    /* ------------------- Getters & Setters  ----------------------------- */

    // Event ID
    get_eventID() { return this._id}
    set_eventID(id) {
        this._id = id
        return true
    }

    get_lat() {
        console.log("HOEFHWIOFHWEIFHEWFH")
        console.log(this.loc)
        console.log("what?")
        return this.loc['lat']
    }
    
    get_long() {
        return this.loc['lng']
    }

    // Name
    get_name() { return this.name }
    set_name(new_name) {
        if (is_valid_name(new_name)){
            this.name = new_name
            return true
        }
        return false
    }
 
    // Description
    get_desc() { return this.desc }
    set_desc(new_desc) {
        if (is_valid_desc(new_desc)){
            this.desc = new_desc
            return true
        }
        return false
    }

    // Start and End Dates
    get_start_date() { return this.start_date }
    set_start_date(start) {
        if (is_valid_date_pair(start, this.end_date)){
            this.start_date = start
            return true
        }
        return false
    }
    get_end_date() { return this.end_date }
    set_end_date(end) {
        if (is_valid_date_pair(this.start_date, end)){
            this.end_date = end
            return true
        }
        return false
    }

    // Address and Locations
    get_address() { return this.addr }
     /* Note: Set address always called within is_valid_addr callback */
     set_address(new_addr) {
        this.addr = new_addr
        return true
    }
    set_loc(loc){
        this.loc = loc
        return true
    }

    //Tags
    get_tags() { return this.tags }
    set_tags(new_tags) {
        this.tags = new_tags
        return true
    }
    add_tag(new_tag) {
        var numTags = this.tags.length
        if (numTags < MAX_TAGS) {
            if (!this.tags.includes(new_tag)) {
                this.tags.push(new_tag)
                return true
            }
        }
        return false
    }
    
    // Admins
    get_admins() { return this.admins }
    is_admin(user) { return (this.admins.includes(user.getUserName()))}
    add_admin(admin) {
        if (!this.admins.includes(admin)) {
            this.admins.push(admin)
            return true
        }
        return false
    }
    
    // Boost
    is_boosted() { return this.isBoosted }
    set_boost(user) {
        if(this.is_admin(user)) {
            this.isBoosted = true
            return true
        }
        return false
    }

    // Points is not a attribute of the class, but is just a result of whether the event is boosted or not
    get_points() { 
        if (!this.is_null_event()) {
            if (this.is_boosted()) {
                return 15
            }
            else {
                return 10
            }
        }
        else {
            return null
        }
    }

    edit_event(user, event_name, description, start, end, loc, tags, admins) {
        return true;
    }

    /* ------------------- Database Calls  ----------------------------- */


    /* TODO ITER2: get going and get interested is off */
    /*
        Different statuses are:
        "Interested"
        "Going"
        "CheckedIn"
     */

    // Gets all people that have a certain status for an event
    get_status_people(status, cb) {
        fetch(`${BASE_URL}/userEvents/events/${this._id}/${status}`, {
            method: 'GET',
            headers: fetch_headers,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            cb(responseJson)
        })
        .catch((error) => {
            console.error(error);
            cb(null)
        });
    }

    /* Get all friends that have a certain status for an event */
    get_status_friends(user, status, cb) {
        fetch(`${BASE_URL}/queryFriendsAttendingEvent?userId=${user._id}&eventId=${this.get_eventID()}&status=${status}`, {
            method: 'GET',
            headers: fetch_headers,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            cb(responseJson)
        })
        .catch((error) => {
            console.error(error);
            cb(null)
        });
    }

    /* Set User-Event status (set user's status for the given event) */
    add_follower(user, status, cb) {
        fetch(`${BASE_URL}/userEvents`, {
            method: 'POST',
            headers: fetch_headers,
            body: JSON.stringify({
                status: status,
                eventId: this._id,
                userId: user._id,
            })
        })
        .then((response) => response.text())
        .then((responseText) => {
            cb(responseText)
        })
        .catch((error) => {
            console.log("is it this?")
            console.error(error);
            cb(null)
        });
    }

    /* Remove a user event status relation */
    remove_follower(usereventID) {
        fetch(`${BASE_URL}/userEvents/${usereventID}`, {
            method: 'DELETE',
            headers: fetch_headers,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            cb(responseJson)
        })
        .catch((error) => {
            console.error(error);
            cb(null)
        });
    }

/* ------------------- Other Functions  ----------------------------- */

    get_hot_level() {
        return this.hot_level
    }

    verify_loc(user) {
        return true
    }
}
