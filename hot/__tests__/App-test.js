/**
 * @format
 */

import 'react-native';
import React from 'react';
import Event, { is_valid_addr } from '../components/classes/event.js'
import User from '../components/classes/user.js'
import Tag from '../components/classes/tag.js'
import Followable from '../components/classes/followable.js'

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

//it('renders correctly', () => {
//renderer.create(<App />);
//});

/*
// ---------- User Tests ---------------------------
var bobby = new User(0, "", "", "", "", (new Date('2019-01-02')), '');
var alice = new User(0, "", "", "", "", (new Date('2019-01-02')), '');
var calvin = new User(0, "", "", "", "", (new Date('2019-01-02')), '');
var david = new User(0, "", "", "", "", (new Date('2019-01-02')), '');

function reset() {
    bobby = new User(0, "", "", "", "", (new Date('2019-01-02')), '');
    alice = new User(0, "", "", "", "", (new Date('2019-01-02')), '');
    calvin = new User(0, "", "", "", "", (new Date('2019-01-02')), '');
    david = new User(0, "", "", "", "", (new Date('2019-01-02')), '');
}

describe('testing getters and setters', () => {
    beforeAll(() => {
        reset();
    });


    test('testing get/set UserID', () => {
        // will check for repeat UserIDs
        // check for integer input only
        expect(bobby.setUserID(0)).toBe(false);
        expect(bobby.setUserID("hi")).toBe(false);
        expect(bobby.getUserID()).toBe(0);
        expect(bobby.setUserID(1111)).toBe(true);
        expect(bobby.getUserID()).toBe(1111);
        expect(bobby.setUserID("#%^&#")).toBe(false);
        expect(bobby.setUserID("11#c")).toBe(false);
        expect(bobby.getUserID()).toBe(1111);

        // check for repeated userID
        expect(alice.setUserID(1111)).toBe(false);
        expect(alice.getUserID()).toBe(0);
        expect(alice.setUserID(1112)).toBe(true);
        expect(alice.getUserID()).toBe(1112);

    });

    test('testing get/set UserName', () => {
        // will check for repeated UserNames
        // can contain alphabet only/ alphabet + number
        expect(bobby.setUserName("")).toBe(false);
        expect(bobby.setUserName("iambobby!")).toBe(false);
        expect(bobby.getUserName()).toBe("");
        expect(bobby.setUserName("bobbyiscool")).toBe(true);
        expect(bobby.getUserName()).toBe("bobbyiscool");
        expect(bobby.setUserName("bobby1234")).toBe(true);
        expect(bobby.getUserName()).toBe("bobby1234");
        expect(bobby.setUserName("2357>#$%")).toBe(false);
        expect(bobby.setUserName(32795)).toBe(false);
        expect(bobby.getUserName()).toBe("bobby1234");

        // check for repeated username
        expect(alice.setUserName("bobby1234")).toBe(false);
        expect(alice.getUserName()).toBe("");
        expect(alice.setUserName("alice")).toBe(true);
        expect(alice.getUserName()).toBe("alice");

    });

    test("testing get/set FirstName", () => {
        // check for alphanumeric input only
        // do not need to check for repeated firstname
        expect(bobby.setFirstName("")).toBe(false);
        expect(bobby.setFirstName("iambobby!")).toBe(false);
        expect(bobby.getFirstName()).toBe("");
        expect(bobby.setFirstName("bobbyiscool")).toBe(true);
        expect(bobby.getFirstName()).toBe("bobbyiscool");
        expect(bobby.setFirstname("bobby1234")).toBe(true);
        expect(bobby.getFirstName()).toBe("bobby1234");
        expect(bobby.setFirstName("2357>#$%")).toBe(false);
        expect(bobby.setFirstName(32795)).toBe(false);
        expect(bobby.getFirstName()).toBe("bobby1234");

        expect(alice.setFirstName("bobby1234")).toBe(true);
        expect(alice.getFirstName()).toBe("bobby1234");
    });


    test("testing get/set LastName", () => {
        // check for alphanumeric input only
        // do not need to check for repeated firstname
        expect(bobby.setLastName("")).toBe(false);
        expect(bobby.setLastName("iambobby!")).toBe(false);
        expect(bobby.getLastName()).toBe("");
        expect(bobby.setLastName("bobbyiscool")).toBe(true);
        expect(bobby.getLastName()).toBe("bobbyiscool");
        expect(bobby.setLastName("bobby1234")).toBe(true);
        expect(bobby.getLastName()).toBe("bobby1234");
        expect(bobby.setLastName("2357>#$%")).toBe(false);
        expect(bobby.setLastName(32795)).toBe(false);
        expect(bobby.getLastName()).toBe("bobby1234");

        expect(alice.setLastName("bobby1234")).toBe(true);
        expect(alice.getLastName()).toBe("bobby1234");
    });

    test("testing get/set Email", () => {
        // check for the correct email address format, i.e. whether it contains @
        // check for valid email address
        expect(bobby.setEmail("")).toBe(false);
        expect(bobby.setEmail("bobby@uchicago.edu")).toBe(true);
        expect(bobby.getEmail()).toBe("bobby@uchicago.edu");
        expect(bobby.setEmail("bobbyfewhogbw32")).toBe(false);
        expect(bobby.setEmail("giww23#@%$@^@#")).toBe(false);
        expect(bobby.setEmail("bobby@gsnail.com")).toBe(false);
        expect(bobby.getEmail()).toBe("bobby@uchicago.edu");

        expect(alice.setEmail("bobby@uchicago.edu")).toBe(true);
        expect(alice.setEmail("alicegmail.com")).toBe(false);
        expect(alice.getEmail()).toBe("bobby@uchicago.edu");
    });

    test("testing set/get Date", () => {
        // check for valid date input
        // in the format of YYYY-MM-DD
        // test for corner cases: invalid format, invalid month/day
        expect(bobby.setDateJoined("")).toBe(false);
        expect(bobby.setDateJoined(2019, 10, 15)).toBe(true);
        expect(bobby.getDateJoined()).toBe(new Date("October 24, 2019"));
        expect(bobby.setDateJoined(2019, 2, 30)).toBe(false);
        expect(bobby.setDateJoined(2019, 13, 1)).toBe(false);
        expect(bobby.setDateJoined(12, 1, 2019)).toBe(false);
        expect(bobby.setDateJoined(25, 12, 2019)).toBe(false);
    });

    test("testing set/get password", () => {
        // password must contain one lower case and one upper case and a number
        // test for normal cases and passwords that include special symbols
        // test for corner cases, i.e. does not contain upper case
        // does not contain lower case
        // does not contain number
        expect(bobby.setPassword("")).toBe(false);
        expect(bobby.setPassword("2019Iambobby")).toBe(true);
        expect(bobby.getPassword()).toBe("2019Iambobby");
        expect(bobby.setPassword("2019iambobby")).toBe(false);
        expect(bobby.setPassword("Iambobby")).toBe(false);
        expect(bobby.setPassword("2019Iambobby!")).toBe(true);
        expect(bobby.setPassword("2019IAMBOBBY")).tobe(false);
        expect(bobby.getPassword()).toBe("2019Iambobby!");
    });

});

describe('testing friend invitation', () => {
    beforeAll(() => {
        reset();
    });

    test('testing follow/ unfollow', () => {
        // get person based on username and follow the user
        // first test following one friend only
        expect(bobby.setUserName("bobbyiscool")).toBe(true);
        expect(alice.setUserName("alice1234")).toBe(true);
        expect(calvin.setUserName("calvin")).toBe(true);
        expect(david.setUserName("david")).toBe(true);

        // let bobby follows one other friend
        // check for unexisting username
        // a person cannot follow himself
        // if a person has already follow a friend, it should return false
        // a person can follow back the person who follows him
        expect(bobby.followFriend("")).toBe(false);
        expect(bobby.followFriend("alice1234")).toBe(true);
        expect(bobby.followFriend("hellobobby")).toBe(false);
        expect(bobby.followFriend("bobbyiscool")).toBe(false);
        expect(bobby.followFriend("alice1234")).toBe(false);
        expect(alice.followFriend("bobbyiscool")).toBe(true);
        expect(alice.followFriend(1256)).toBe(false);

        // noe test the function of unfollowing friend
        // check for unexisting username
        // a person cannot unfollow himself
        // only people that are followed can be unfollowed
        expect(bobby.unfollowFriend("")).toBe(false);
        expect(bobby.unfollowFriend("alice1234")).toBe(true);
        expect(bobby.unfollowFriend("bobbyiscool")).toBe(false);
        expect(bobby.unfollowFriend("calvin")).toBe(false);
        expect(bobby.unfollowFriend("hellobobby")).toBe(false);
        expect(bobby.followFriend("alice1234")).toBe(true);
        expect(bobby.unfollowFriend("alice1234")).toBe(false);
        expect(bobby.unfollowFriend(1234)).toBe(false);


        // check the function of following a list of friends
        expect(bobby.followFriends([])).toBe([]);
        expect(bobby.followFriends(["alice1234", "calvin"])).toBe([]);
        expect(bobby.followFriends(["david", "calvin"])).tobe(["calvin"]);
        bobby.unfollowFriend("david");
        expect(bobby.followFriends(["bobbyiscool", "heybobby", "david", 1234])).toBe(["bobbyiscool", "heybobby", 1234]);


        // check the function of unfollowing a list of friends
        expect(bobby.unfollowFriends([])).toBe([]);
        expect(bobby.unfollowFriends(["alice1234", "calvin", "david"])).toBe([]);
        expect(bobby.unfollowFriends(["heybobby", "bobbyiscool"])).toBe(["heybobby", "bobbyiscool"]);
        expect(bobby.unfollowFriends([1234, "heybobby"])).toBe([1234, "heybobby"]);


    });
});

test('user save events', () => {
    const date = new Date('2020-01-01T01:01:01')
    const evt = new Event("name1", "desc", date, "Ida Noyes", "science")
    const user = new User("ross")
        // a user cannot save an event with the same status multiple times
        // but a user can change the status
    expect(user.saveEvent(evt, "interested")).toBe(true);
    expect(user.saveEvent(evt, "interested")).toBe(false);
    expect(user.saveEvent(evt, "going")).toBe(true);

})
*/

// ---------- Event Tests ---------------------------
function n_str(n) {
    var ret = ""
    for (i = 0; i < n; i++) {
        ret += "a"
    }
    return ret;
}

test('event constructor!', function() {
    var good_event = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["admin"])
    expect(good_event.get_name()).toBe("e")
    expect(good_event.get_desc()).toBe("desc")

    var s = new Date("01 Jun 2019 00:00:00 GMT")
    var e = new Date("02 Jun 2019 00:00:00 GMT")

    expect(good_event.get_start_date().getTime() == s.getTime()).toBeTruthy()
    expect(good_event.get_end_date().getTime() == e.getTime()).toBeTruthy()
    expect(good_event.get_admins()).toEqual(["admin"])
    expect(good_event.get_address()).toBe("Times Square")
    expect(good_event.get_tags()).toEqual(["tags"])
    expect(good_event.is_boosted() == false).toBeTruthy()

    const bad_event = new Event("", "desc", new Date(), new Date(), "12 st.", "tags", "admin")
        // bad event should be null event (all other params are "" or null)
    expect(bad_event.get_name()).toBe("")
    expect(bad_event.get_desc()).toBe("")
    expect(bad_event.get_start_date()).toBe(null)
    expect(bad_event.get_end_date()).toBe(null)
    expect(bad_event.get_admins()).toEqual([])
    expect(bad_event.get_address()).toBe("")
    expect(bad_event.get_tags()).toEqual([])
    expect(good_event.is_boosted() == false).toBeTruthy()



})

test('event name!', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["admin"])
    expect(event.get_name()).toBe("")
    expect(event.set_name("event1")).toBeTruthy()
    expect(event.get_name()).toBe("event1")
    expect(event.set_name(n_str(129))).toBeFalsy()
    expect(event2.get_name()).toBe("e")
    expect(event2.set_name("e2")).toBeTruthy()
    expect(event2.get_name()).toBe("e2")
})

test('event desc!', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["admin"])
    expect(event.get_desc()).toBe("")
    expect(event.set_desc("desc1")).toBeTruthy()
    expect(event.get_desc()).toBe("desc1")
    expect(event.set_desc(n_str(1001))).toBeFalsy()
    expect(event2.get_desc()).toBe("desc")
    expect(event2.set_desc("desc2")).toBeTruthy()
    expect(event2.get_desc()).toBe("desc2")
})

test('event date!', function() {
    const event_null = new Event("", "", "", "", "", "", "", "");
    expect(event_null.get_start_date()).toBe(null);
    expect(event_null.get_end_date()).toBe(null);

    const event = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["admin"])
    //Set valid Start and End dates
    const new_start = new Date("01 Feb 2019 00:00:00 GMT");
    expect(event.set_start_date(new_start)).toBeTruthy()
    const new_end = new Date("01 Jun 2019 1:00:00 GMT");
    expect(event.set_end_date(new_end)).toBeTruthy()

    // Invalid Start
    const invalid_start = new Date("02 Jun 2019 00:00:00 GMT");
    expect(event.set_start_date(invalid_start)).toBeFalsy()
    expect(event.get_start_date()).toBe(new_start);

    // Invalid End
    const invalid_end = new Date("12 Jan 2019 00:00:00 GMT");
    expect(event.set_end_date(invalid_end)).toBeFalsy()
    expect(event.get_end_date()).toBe(new_end);
})

test('event addr', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(event.get_address()).toBe("");
    is_valid_addr("Cornelia St", (res) => {
        expect(res.toBeTruthy())
        event.set_address("Cornelia St").toBeTruthy()
        expect(event.get_address()).toBe("Cornelia St")
    })
    is_valid_addr("adjawdjaahd", (res) => {
        expect(res.toBeFalsy())
        expect(event2.get_address()).toBe("12 st.")
    })
})

test('event tags', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    const event3 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tg1", "tg2"], ["admin"])
    expect(event.get_tags()).toEqual([]);
    expect(event.add_tag("t1")).toBeTruthy()
    expect(event.add_tag("t2")).toBeTruthy()
    expect(event.get_tags()).toEqual(["t1", "t2"])
    expect(event2.get_tags()).toEqual(["tags"])
    expect(event2.add_tag("tag2")).toBeTruthy()
    expect(event2.get_tags()).toEqual(["tags", "tag2"])
    expect(event3.get_tags()).toEqual(["tg1", "tg2"])
})

test('booboobooboosted !', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(event.is_boosted()).toBeFalsy()
    expect(event2.is_boosted()).toBeFalsy()
    expect(event.set_boost()).toBeTruthy()
    expect(event2.set_boost()).toBeTruthy()
    expect(event.is_boosted()).toBeTruthy()
    expect(event2.is_boosted()).toBeTruthy()
})

test('event admin!', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(event.get_admins()).toEqual([])
    expect(event.add_admin("a2"))
    expect(event.get_admins()).toEqual(["a2"])
    expect(event2.get_admins()).toEqual(["admin"])
})


test('get_people_interested', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const user = new User("int1")
    const user2 = new User("int2")
    const user3 = new User("going1")

    user.save_event(event, "interested")
    user2.save_event(event, "interested")
    user3.save_event(event, "going")
    expect(event.get_interested_people()).toBe(["int1", "int2"])
})

test('get people going', function() {
    const event = new Event("")
    const user = new User("going1")
    const user2 = new User("going2")
    const user3 = new User("int1")
    user.save_event(event, "going")
    user2.save_event(event, "going")
    user3.save_event(event, "interested")
    expect(event.save_event()).toBe(["going1", "going2"])
})

test('get check ins!', function() {
    const event = new Event("")
    const user = new User("going1")
    const user2 = new User("going2")
    const user3 = new User("int1")
    user.save_event(event, "gone")
    user2.save_event(event, "gone")
    user3.save_event(event, "gone")
    expect(event.get_check_ins()).toBe(["going1", "going2", "int1"])
})

// ---------- Tag Tests ---------------------------
test('constructor!!', function() {
    const tag = new Tag(0, "")
    expect(tag.ID).toBeNull()
    const tag1 = new Tag("asdf", "a")
    expect(tag1.ID).toBeNull()
    const tag2 = new Tag(-1, "a")
    expect(tag2.ID).toBeNull()
    const tag3 = new Tag(0, "a")
    expect(tag3).toBeInstanceOf(Tag)
});


test('Tag get/set name!!', function() {
    // name must be any string of characters of length > 0.
    const tag = new Tag(1, "asdf")
    expect(tag.get_name()).toEqual("asdf")
    expect(tag.set_name("asdf1")).toBeTruthy()
    expect(tag.get_name()).toEqual("asdf1")
    expect(tag.set_name("")).toBeFalsy()
    expect(tag.get_name()).toEqual("asdf1")
    expect(tag.set_name(0)).toBeFalsy()
    expect(tag.get_name()).toEqual("asdf1")
});

test('Tag get ID!!', function () {
    // id must be an int, but this is checked in the constructor.
    // there is no setter for the id since it is set by the db.
    const tag = new Tag(1, "asdf")
    expect(tag.get_id()).toEqual(1)
});