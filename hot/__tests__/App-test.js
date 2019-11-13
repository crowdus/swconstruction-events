/**
 * @format
 */

import 'react-native';
import React from 'react';
import { App, Event, Community, User } from '../App';

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

//it('renders correctly', () => {
//renderer.create(<App />);
//});

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


// ---------- Event Tests ---------------------------
function n_str(n) {
    var ret = ""
    for (i = 0; i < n; i++) {
        ret += "a"
    }
    return ret;
}

test('event constructor!', function() {
    const good_event = new Event("e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(good_event.get_name()).toBe("e")
    expect(good_event.get_desc()).toBe("desc")

    var s = new Date("01 Jun 2019 00:00:00 GMT")
    var e = new Date("02 Jun 2019 00:00:00 GMT")

    expect(good_event.get_start_date().getTime() == s.getTime()).toBeTruthy()
    expect(good_event.get_end_date().getTime() == e.getTime()).toBeTruthy()
    expect(good_event.get_admins()).toBe(["admin"])
    expect(good_event.get_address()).toBe("12 st.")
    expect(good_event.get_tags()).toBe(["tags"])
    expect(good_event.get_boost().toBeFalsy())

    const bad_event = new Event("", "desc", new Date(), new Date(), "12 st.", "tags", "admin")
        // bad event should be null event (all other params are "" or null)
    expect(bad_event.get_name()).toBe("")
    expect(bad_event.get_desc()).toBe("")
    expect(bad_event.get_start_date()).toBe(null)
    expect(bad_event.get_end_date()).toBe(null)
    expect(bad_event.get_admins()).toBe([])
    expect(bad_event.get_address()).toBe("")
    expect(bad_event.get_tags()).toBe([])
    expect(bad_event.get_boost().toBeFalsy())



})

test('event name!', function() {
    const event = new Event("");
    const event2 = new Event("e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(event.get_name()).toBe("")
    expect(event.set_name("event1")).toBeTruthy()
    expect(event.get_name()).toBe("event1")
    expect(event.set_name(n_str(129))).toBeFalsy()
    expect(event2.get_name()).toBe("e")
    expect(event2.set_name("e2")).toBeTruthy()
    expect(event2.get_name()).toBe("e2")
})

test('event desc!', function() {
    const event = new Event("");
    const event2 = new Event("e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(event.get_desc()).toBe("")
    expect(event.set_desc("desc1")).toBeTruthy()
    expect(event.get_desc()).toBe("desc1")
    expect(event.set_desc(n_str(1001))).toBeFalsy()
    expect(event2.get_desc()).toBe("desc")
    expect(event2.set_desc("desc2")).toBeTruthy()
    expect(event2.get_desc()).toBe("desc2")
})

test('event date!', function() {
    const event = new Event("e", "desc", new Date("01 Mar 2019 00:00:00 GMT"), new Date("02 Mar 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])

    expect(event.get_start_date()).toBe(null);
    expect(event.get_end_date()).toBe(null);

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
    const event = new Event("");
    const event2 = new Event("e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(event.get_address()).toBe("");
    expect(event.set_address("cornelia st.")).toBeTruthy()
    expect(event.get_address()).toBe("cornelia st.")
    expect(event2.get_address()).toBe("12 st.")
    expect(event2.set_address("bool st.")).toBeTruthy()
    expect(event2.get_address()).toBe("bool st.")
})

test('event tags', function() {
    const event = new Event("");
    const event2 = new Event("e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    const event3 = new Event("e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tg1", "tg2"], ["admin"])
    expect(event.get_tags()).toBe(null);
    expect(event.add_tag("t1")).toBeTruthy()
    expect(event.add_tag("t2")).toBeTruthy()
    expect(event.get_tags()).toBe(["t1", "t2"])
    expect(event2.get_tags()).toBe("tags")
    expect(event2.add_tag("tag2")).toBeTruthy()
    expect(event2.get_tags()).toBe(["tags", "tags2"])
    expect(event3.get_tags()).toBe(["tg1", "tg2"])
})

test('booboobooboosted !', function() {
    const event = new Event("");
    const event2 = new Event("e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(event.get_boost()).toBeFalsy()
    expect(event2.get_boost()).toBeFalsy()
    expect(event.set_boost()).toBeTruthy()
    expect(event2.set_boost()).toBeTruthy()
    expect(event.get_boost()).toBeTruthy()
    expect(event2.get_boost()).toBeTruthy()
})

test('event admin!', function() {
    const event = new Event("");
    const event2 = new Event("e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"])
    expect(event.get_admins()).toBe("")
    expect(event.add_admin("a2"))
    expect(event.get_admins()).toBe([a2])
    expect(event2.get_admins()).toBe(["admin"])
})


test('get_people_interested', function() {
    const event = new Event("")
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

// ---------- Community Tests ---------------------------
test('name!', function() {
    const user = new User("")
    expect(user.get_username()).toBe('')
    expect(user.set_username('asdf')).toBeTruthy()
    expect(user.get_username()).toBe('asdf')
});


test('community name!', function() {
    const c = new Community("community1", 0)
    expect(c.get_name()).toBe("community1")
    expect(c.set_name("")).toBeFalsy()
    expect(c.get_name()).toBe("community1")
    expect(c.set_name(0)).toBeFalsy()
    expect(c.get_name()).toBe("community1")
    expect(c.set_name(null)).toBeFalsy()
    expect(c.get_name()).toBe("community1")
    expect(c.set_name("0")).toBeTruthy()
    expect(c.get_name()).toBe("0")
    const dup = new Community("duplicate", 0)
    expect(dup.set_name("community1")).toBeFalsy()
    expect(dup.get_name()).toBe("duplicate")
});

test('community privacy!', function() {
    const c = new Community("name", 0)
    expect(c.get_privacy()).toBe(0)
    expect(c.set_privacy("asdf")).toBeFalsy()
    expect(c.get_privacy()).toBe(0)
    expect(c.set_privacy(0)).toBeTruthy()
    expect(c.get_privacy()).toBe(0)
    expect(c.set_privacy(1)).toBeTruthy()
    expect(c.get_privacy()).toBe(1)
});

test('member functionality!!', function() {
    const c = new Community("name", 0)
    const date = new Date('2020-01-01T01:01:01')
    const evt = new Event("name1", "desc", date, "Ida Noyes", "science")
    const user = new User("ross")

    //basic user add
    expect(c.get_members()).toHaveLength(0)
    expect(c.add_member(user)).toBeTruthy()
    expect(c.add_member(user)).toBeFalsy()
    expect(c.get_members()).toHaveLength(1)

    //adding bad member types
    expect(c.add_member(evt)).toBeFalsy()
    expect(c.get_members()).toHaveLength(1)
    expect(c.add_member("string is bad")).toBeFalsy()
    expect(c.get_members()).toHaveLength(1)
    expect(c.add_member(9)).toBeFalsy()
    expect(c.get_members()).toHaveLength(1)

    //check member existence
    expect(c.is_member(user)).toBeTruthy()
    expect(c.remove_member(user)).toBeTruthy()
    expect(c.is_member(user)).toBeFalsy()
    expect(c.remove_member(user)).toBeFalsy()
    expect(c.is_member(user)).toBeFalsy()
});


test('event functionality!!!', function() {
    const c = new Community("name", 0)
    const date = new Date('2020-01-01T01:01:01')
    const evt = new Event("name1", "desc", date, "Ida Noyes", "science")
    const user = new User("ross")

    //basic event add
    expect(c.get_events()).toHaveLength(0)
    expect(c.add_event(evt)).toBeTruthy()
    expect(c.add_event(evt)).toBeFalsy()
    expect(c.get_events()).toHaveLength(1)

    //adding bad event types
    expect(c.add_event(user)).toBeFalsy()
    expect(c.get_events()).toHaveLength(1)
    expect(c.add_event("string is bad")).toBeFalsy()
    expect(c.get_events()).toHaveLength(1)
    expect(c.add_event(9)).toBeFalsy()
    expect(c.get_events()).toHaveLength(1)

    //check event existence
    expect(c.is_event(evt)).toBeTruthy()
    expect(c.remove_event(evt)).toBeTruthy()
    expect(c.is_event(evt)).toBeFalsy()
    expect(c.remove_event(evt)).toBeFalsy()
    expect(c.is_event(evt)).toBeFalsy()

    //test event creation through community class
    const d = new Date('2020-01-01T01:01:01')
    expect(c.create_event("", "", "", "", "", "")).toBeFalsy()
    expect(c.get_events()).toHaveLength(0)
    expect(c.create_event("blergh", "description", d, "Ida Noyes", "javascript")).toBeFalsy()
    expect(c.get_events()).toHaveLength(1)
});
