/**
 * @format
 */

import 'react-native';
import React from 'react';
import Event, { is_valid_addr, get_event_from_id } from '../components/classes/event.js'
import User, {get_user_from_id, constructUser, setUserID, check_valid_name,check_valid_email, check_valid_password, basicallysame} from '../components/classes/user.js'
import Tag from '../components/classes/tag.js'
import Followable from '../components/classes/followable.js'
import { getMaxListeners } from 'cluster';


// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

//it('renders correctly', () => {
//renderer.create(<App />);
//});

// ---------- User Tests ---------------------------
bobby = new User(null, "bobby1234", "bobby", "johnson", "bobbyjohnson@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
alice = new User(null, "alicehey", "alice", "moore", "alicemoore@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
calvin = new User(null, "calvin67", "calvin", "lee", "calvinlee@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
david = new User(null, "david100", "david", "corrie", "davidcorrie@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);

function reset() {
    bobby = new User(null, "bobby1234", "bobby", "johnson", "bobbyjohnson@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
    alice = new User(null, "alicehey", "alice", "moore", "alicemoore@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
    calvin = new User(null, "calvin67", "calvin", "lee", "calvinlee@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
    david = new User(null, "david100", "david", "corrie", "davidcorrie@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
}

function convert(realuser){
    return new User(realuser._id, realuser.username, realuser.firstname, realuser.lastname, realuser.email,
     realuser.datejoined, realuser.password, realuser.point, realuser.friends)
}

// tests for validation functions
describe('testing validation functions', () => {
    test('testing check_valid_name', () => {
        expect(check_valid_name("fong27")).toBe(true);
        expect(check_valid_name("")).toBe(false);
        expect(check_valid_name(274)).toBe(false);
        expect(check_valid_name("@!%vwohgeoef")).toBe(false);
    });

    test('testing check_valid_password', () => {
        expect(check_valid_password("2019IamBobby")).toBe(true);
        expect(check_valid_password("2019Iam")).toBe(false);
        expect(check_valid_password("2019iambobby")).toBe(false);
        expect(check_valid_password("Iambobby")).toBe(false);
    });

    test('testing check_valid_email', () => {
        expect(check_valid_email("bobby@uchicago.edu")).toBe(true);
        expect(check_valid_email("bobbyuchicago.edu")).toBe(false);
        expect(check_valid_email("bobby@uchicago")).toBe(false);
    })

});


// This part of the unit test is meant to test whether the constructor
// is working well with the database. Since running this test repeatedly 
// will destroy our db, we commented this part out after we confirm that 
// the function works

// describe('testing construct user', () => {
//     // test('testing set_user_id', async () => {
//     //     userone = new User(null, "bobby1234", "bobby", "johnson", "bobbyjohnson@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, ["5dcd241d8a5d632450dea810"]);
//     //     expect(await setUserID(userone)).toBe(true);
//     //     usertwo = new User(null, "calvin67", "calvin", "lee", "calvinlee@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);

//     // });

//     // test('testing ', async () => {
//     //     const realuser = await constructUser("bobby1234", "bobby", "johnson", "bobbyjohnson@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, ["5ddd7061b1e48e771577a390"]);
//     //     const realuser2 = await constructUser("david100", "david", "corrie", "davidcorrie@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
        
//         // console.log(realuser);
//     })
// })

/*describe('testing string comparisons', () => {
    expect(standardize("HI I AM SHOUTING")).toBe("hi i am shouting");
    expect(standardize("hI i am SHOUtING")).toBe("hi i am shouting");
    expect(standardize("hi i am shouting")).toBe("hi i am shouting");
    expect(basicallysame("", "")).toBe(true);
    expect(basicallysame("UPPER And lower", "upper aND LOWER")).toBe(true);
    expect(basicallysame("", "upper aND LOWER")).toBe(false);
    expect(basicallysame("upper and lower", "upper aND LOWER")).toBe(true);
});*/


describe('testing getters and setters', () => {
    beforeAll(() => {
        reset();
    });

    test ('test constructor and setUserID', () => {

        var check = new Date('2019-01-02');
        const good_user = new User(null, "fong28", "fong", "hong", "fonghong@gmail.com", (new Date('2019-01-02')), "Fonghong28",12, '');
        expect(good_user.getUserID()).toBe(null);
        expect(good_user.getUserName()).toBe("fong28");
        expect(good_user.getFirstName()).toBe("fong");
        expect(good_user.getLastName()).toBe("hong");
        expect(good_user.getEmail()).toBe("fonghong@gmail.com");
        expect(good_user.getDateJoined()).toEqual(new Date('2019-01-02'));
        expect(good_user.getPassword()).toBe("Fonghong28");
        expect(good_user.getPoint()).toBe(12);

        const bad_user = new User(null, "", "fong", "hong", "fonghong@gmail.com", (new Date('2019-01-02')), "Fonghong28",0, '');
        expect(bad_user.getUserName()).toBe("");
        expect(bad_user.getFirstName()).toBe("");
        expect(bad_user.getLastName()).toBe("");
        expect(bad_user.getEmail()).toBe("");
        expect(bad_user.getDateJoined()).toBe(null);
        expect(bad_user.getPassword()).toBe("");
        expect(bad_user.getPoint()).toBe(0);

    });

    test('testing get/set UserName', async () => {
        //will check for repeated UserNames
        //can contain alphabet only/ alphabet + number
        
        
        var realuser = await get_user_from_id("5de632692ddbac00172de5d2")
        console.log(realuser);
        realuser = convert(realuser);
        expect(await realuser.setUserName("")).toBe(false);
        expect(await realuser.setUserName("iambobby!")).toBe(false);
        realuser = await get_user_from_id(realuser._id);
        realuser = convert(realuser);
        expect(realuser.getUserName()).toBe("Jiayitest");
        
        expect(await realuser.setUserName("Jiayitestiscool")).toBe(true);
        //console.log(realuser);
        expect(await realuser.setUserName("dijon")).toBe(false); // this one exists in database already
        expect(await realuser.setUserName("Jiayitest")).toBe(true); //resets test
    }, 30000);

    test("testing get/set FirstName", () => {
        // check for alphanumeric input only
        // do not need to check for repeated firstname
        expect(bobby.setFirstName("")).toBe(false);
        expect(bobby.setFirstName("iambobby!")).toBe(false);
        expect(bobby.getFirstName()).toBe("bobby");
        expect(bobby.setFirstName("bobbyiscool")).toBe(true);
        expect(bobby.getFirstName()).toBe("bobbyiscool");
        expect(bobby.setFirstName("bobby1234")).toBe(true);
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
        expect(bobby.getLastName()).toBe("johnson");
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

    test("testing get/set Email", async () => {
        // check for the correct email address format, i.e. whether it contains @
        // check for valid email address
        expect(await bobby.setEmail("")).toBe(false);
        expect(await bobby.setEmail("bobby@uchicago.edu")).toBe(true);
        expect(bobby.getEmail()).toBe("bobby@uchicago.edu");
        expect(await bobby.setEmail("bobbyfewhogbw32")).toBe(false);
        expect(await bobby.setEmail("giww23#@%$@^@#")).toBe(false);
        expect(await bobby.setEmail("bobby@gsnail.com")).toBe(true);
        expect(bobby.getEmail()).toBe("bobby@gsnail.com");
    }, 30000);

    test("testing set/get Date", () => {
        // check for valid date input
        // in the format of YYYY-MM-DD
        // test for corner cases: invalid format, invalid month/day
        expect(bobby.setDateJoined("")).toBe(false);
        expect(bobby.setDateJoined(new Date('2019-01-02'))).toBe(true);
        expect(bobby.getDateJoined()).toEqual(new Date('2019-01-02'));
        expect(bobby.setDateJoined(new Date('2019-02-31'))).toBe(true);
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
        expect(bobby.setPassword("2019IAMBOBBY")).toBe(false);
        expect(bobby.getPassword()).toBe("2019Iambobby!");
    });

    test("testing set/get points", () => {
        // score may not be set to be negative
        // if the input is invalid, it will return a false
        // the score of user will remain unchanged
        expect(bobby.setPoint(1)).toBe(true);
        expect(bobby.getPoint()).toBe(1);
        expect(bobby.setPoint(-10)).toBe(false);
        expect(bobby.getPoint()).toBe(1);
        expect(bobby.setPoint(20)).toBe(true);
        expect(bobby.getPoint()).toBe(20);
    })

});

describe('testing friend following', () => {
    beforeAll(() => {
        reset();
    });

    test('testing follow/ unfollow', async () => {

        // let bobby follow one other friend
        // check for unexisting username
        // a person cannot follow himself
        // a person can follow back the person who follows him

        // additional checking to fix insufficient testing in milestone 3b
        // need to check whether the newly followed friend is in list of friends
        expect(await bobby.follow_user("")).toBe(false);
        expect(await bobby.follow_user("5de6323c2ddbac00172de5d1")).toBe(true);
        expect(bobby.friends.includes("5de6323c2ddbac00172de5d1")).toBe(true);

        //expect(await alice.follow_user("5dcceaacf8b3c20017ac03z6")).toBe(false); //this userid doesn't exist <-- NEED FIX
        //expect(alice.friends.includes("5dcceaacf8b3c20017ac03z6")).toBe(false);
        expect(bobby.friends.includes("bobby1234")).toBe(false);
        expect(await bobby.unfollow_user("5de6323c2ddbac00172de5d1")).toBe(true);
        expect(bobby.friends.includes("5de6323c2ddbac00172de5d1")).toBe(false);
    }, 30000);
});

// // NEW UNIT TESTS ADDED IN FOR ITERATION 2

describe('Points, locally', () => {
    beforeAll(() => {
        reset();
    });

    //var jiayi = get_user_from_id("5dddae422c94dc00172c059d")
    test('testing point system',  () => {
         // first initiate the event to have 2 points
         //var event3 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["bobby"])
        //var event = get_event_from_id("5dde4a4456b39b0017d04e23")
        
        var event = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"], loc=null, boost=false, hot_level=1)
        var bobbysevent = new Event("5dccea31f8b3c20017ac0000", "Bobby's Birthday Bash", "free birthday hugs will be given", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Ryerson 251", [], ["bobby1234"], loc=null, boost=false, hot_level=1)

        expect(bobby.getPoint()).toBe(0)
        expect(bobby.addPoint(event)).toBe(true)
        expect(bobby.getPoint()).toBe(10)
        // a person cannot check in the same event twice <-- event tests this, so we removed this check. This allows us to test addPoint without database
        //expect(bobby.addPoint(event)).toBe(false)
        //expect(bobby.getPoint()).toBe(10)
        /*// initiate some other event to have point 4 <-- no longer necessary, because events do not have diff point attributes
        expect(bobby.addPoint(event2)).toBe(true)
        expect(bobby.getPoint()).toBe(4)*/

        // check the condition where user cannot gain points from event that he created
        //expect(bobby.addPoint(bobbysevent)).toBe(false)
        expect(bobby.getPoint()).toBe(10)
        expect(alice.getPoint()).toBe(0)
        expect(alice.addPoint(bobbysevent)).toBe(true)
        expect(alice.getPoint()).toBe(10)
    });

    test('testing boost events', () => {
        // first initiate the event to have 20 points and bobby has 10 points
        expect(bobby.setPoint(30)).toBe(true)
        expect(bobby.getPoint()).toBe(30)
        // expect(event.getPoint()).toBe(2)
        var event = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["bobby1234"], loc=null, boost=false, hot_level=1)
        var boostedevent = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["bobby1234"], loc=null, boost=true, hot_level=1)

        // before boosting
        expect(calvin.getPoint()).toBe(0)
        expect(calvin.addPoint(event)).toBe(true)
        expect(calvin.getPoint()).toBe(10)

        /*expect(bobby.boost_event(event)).toBe(true)//
        expect(bobby.getPoint()).toBe(30)//
        // expect(event.getPoint()).toBe(3)

        // if a user can boost an event for more than once
        // implement the following test
        // expect(bobby.boost_event()).toBe(true) <-- these require database calls! cannot test without connecting to database
        // expect(bobby.getPoint()).toBe(8)
        // expect(event.getPoint()).toBe(4)*/

        // what happen after an event is boosted?//
        expect(alice.setPoint(0))
        expect(alice.addPoint(boostedevent)).toBe(true)
        expect(alice.getPoint()).toBe(15)
    });
});

/*describe('Points, database', () => {
    beforeAll(() => {
        reset();
    });

    test('testing point system & DATABASE',  () => {
        var katherinetest = get_user_from_id("5ddd90dd2c94dc00172c0596")
        var fishtest = get_user_from_id("5ddedfae224fbf001756834b")
        var mariahcarey = get_event_from_id("5ddf405ad27bd9001745af35")
        var booltime = get_event_from_id("5ddf3647690d920017fb07d1")
        
        /*for reference:
        katherinetest = 
            _id: 5ddd90dd2c94dc00172c0596
            username: khli17
            firstname: Katherine
            lastname: Li
            email: katherinehli@gmail.com
            datejoined: 1970-01-01T00:00:00.027Z
            password: Blehhhhh77
            point: 0
            friends: []
            location: [0,0]
        fishtest = 
            _id: 5ddedfae224fbf001756834b
            username: fisharefriends777
            firstname: Fish
            lastname: Friend
            email: fishy@gmail.com
            datejoined: 1970-01-01T00:00:00.027Z
            password: f12345678910P
            point: 0
            friends: []
            location: [0,0]
        mariahcarey = 
            _id: 5ddf405ad27bd9001745af35
            name: Mariah Carey Listening Party
            desc: Holiday Songs only
            start_date: 2019-11-28T03:32:00.000Z
            end_date: 2019-12-02T03:30:00.000Z
            addr: north campus dorm
            loc: {"lat":41.79460830000001,"lng":-87.5983715}
            isBoosted: false
            tags: ["music"]
            admins: ["JiayiLin135"]
            hot_level: 1
        booltime = 
            _id: 5ddf3647690d920017fb07d1
            name: Bool time
            desc: Taylor sift sing along
            start_date: 2019-11-28T02:47:00.000Z
            end_date: 2019-12-04T02:40:00.000Z
            addr: Bartlett dining hall
            loc: {"lat":41.7919281,"lng":-87.59846390000001}
            isBoosted: false
            tags:[]
            admins: ["david","bobby1234","baduserhcjsjif"]
            hot_level:1
        
        expect(katherinetest.getPoint()).toBe(0)
        expect(katherinetest.addPoint(mariahcarey)).toBe(true)
        expect(katherinetest.getPoint()).toBe(10)
        expect(fishtest.getPoint()).toBe(0)
        // a person cannot check in the same event twice
        //expect(bobby.addPoint(event)).toBe(false)
        //expect(bobby.getPoint()).toBe(10)
});*/

// ---------- Event Tests ---------------------------
function n_str(n) {
    var ret = ""
    for (i = 0; i < n; i++) {
        ret += "a"
    }
    return ret;
}

test('event constructor!', function() {
    var good_event = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["admin"], null, false, 1)
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
    expect(good_event.get_points()).toBe(10)

    const bad_event = new Event("", "desc", new Date(), new Date(), "12 st.", ["tags"], ["admin"], null, false, 1)
        // bad event should be null event (all other params are "" or null)
    expect(bad_event.get_name()).toBe("")
    expect(bad_event.get_desc()).toBe("")
    expect(bad_event.get_start_date()).toBe(null)
    expect(bad_event.get_end_date()).toBe(null)
    expect(bad_event.get_admins()).toEqual([])
    expect(bad_event.get_address()).toBe("")
    expect(bad_event.get_tags()).toEqual([])
    expect(bad_event.is_boosted() == false).toBeTruthy()
    expect(bad_event.get_points()).toBe(null)



})

test('event name!', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["admin"], null, false, 1)
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
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["admin"], null, false, 1)
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

    const event = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "Times Square", ["tags"], ["admin"], null, false, 1)
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
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"], null, false, 1)
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

test('event points !!', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["alicehey"], null, false, 1)
    expect(event.get_points()).toBe(null) //null event has null points and boost
    expect(event.set_boost()).toBe(null)
    expect(event2.get_points()).toBe(10) //this is because unboosted events are worth 10 points (constant val)
    expect(event2.set_boost(alice)).toBeTruthy()
    expect(event2.get_points()).toBe(15) //this is because boosted events are worth 15 points (Constant val)
})

test('event tags', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"], null, false, 1)
    const event3 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tg1", "tg2"], ["admin"], null, false, 1)
    expect(event.get_tags()).toEqual([]);
    expect(event.add_tag("t1")).toBeTruthy()
    expect(event.add_tag("t2")).toBeTruthy()
    expect(event.get_tags()).toEqual(["t1", "t2"])
    expect(event.add_tag("t2")).toBeFalsy()
    expect(event.get_tags()).toEqual(["t1", "t2"])
    expect(event2.get_tags()).toEqual(["tags"])
    expect(event2.add_tag("tag2")).toBeTruthy()
    expect(event2.get_tags()).toEqual(["tags", "tag2"])
    expect(event3.get_tags()).toEqual(["tg1", "tg2"])
})

test('booboobooboosted !', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["alicehey"], null, false, 1)
    expect(event.is_boosted()).toBeFalsy()
    expect(event2.is_boosted()).toBeFalsy()
    expect(event.set_boost()).toBe(null)
    expect(event2.set_boost(alice)).toBeTruthy()
    expect(event.is_boosted() == false).toBeTruthy()
    expect(event2.is_boosted()).toBeTruthy()
})

test('event admin!', function() {
    const event = new Event("", "", "", "", "", "", "", "");
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"], null, false, 1)
    expect(event.get_admins()).toEqual([])
    expect(event.add_admin("a2")).toBeTruthy()
    expect(event.get_admins()).toEqual(["a2"])
    expect(event.add_admin("a2")).toBeFalsy()
    expect(event.get_admins()).toEqual(["a2"])
    expect(event2.get_admins()).toEqual(["admin"])
})

test('user following event !!', function() {
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["admin"], null, false, 1)
    expect(event2.addFollower(alice, "going", (val)=>{
        expect(val != null).toBeTruthy()
        expect(event2.get_status_people("going")).toEqual([alice])
        expect(event2.get_status_people("interested")).toEqual([])
        expect(event2.get_check_ins()).toEqual([])
        expect(event2.removeFollower(alice)).toBeFalsy()
        expect(event2.get_status_people("going")).toEqual([])
    }))
});

test('setting boost !!', function() {
    const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["tags"], ["alicehey"], null, false, 1)
    expect(event2.set_boost(bobby)).toBeFalsy()
    expect(event2.is_boosted()).toBeFalsy()
    expect(event2.set_boost(alice)).toBeTruthy()
    expect(event2.is_boosted()).toBeTruthy() 
    expect(event2.get_points() == 15).toBeTruthy() //boosted events are worth 15
})

// // ---------- Tag Tests ---------------------------

// /*
// - Function to see which events related to certain tag requires database
// - Tag to follow
// -
// */

// test('constructor!!', function() {
//     // The database will set the IDs, so relatively little testing there.
//     // Focuses mostly on the only constraint on name: it can't be null.
//     const tag = new Tag(0, "")
//     expect(tag.ID).toBeNull()
//     const tag3 = new Tag(0, "a")
//     expect(tag3).toBeInstanceOf(Tag)
// });

// test('Tag get/set name!!', function() {
//     // name must be any string of characters of length > 0.
//     const tag = new Tag(1, "asdf")
//     expect(tag.get_name()).toEqual("asdf")
//     expect(tag.set_name("asdf1")).toBeTruthy()
//     expect(tag.get_name()).toEqual("asdf1")
//     expect(tag.set_name("")).toBeFalsy()
//     expect(tag.get_name()).toEqual("asdf1")
//     expect(tag.set_name(0)).toBeFalsy()
//     expect(tag.get_name()).toEqual("asdf1")
// });

// test('Tag get ID!!', function () {
//     // id must be an int, but this is checked in the constructor.
//     // there is no setter for the id since it is set by the db.
//     const tag = new Tag(1, "asdf")
//     expect(tag.get_id()).toEqual(1)
// });

// test('tag test: events!', function() {
//     // name must be any string of characters of length > 0.
//     const tag = new Tag(1, "asdf")
//     expect(tag.get_events()).toEqual([]);
//     const event2 = new Event("5dccea31f8b3c20017ac03c0", "e", "desc", new Date("01 Jun 2019 00:00:00 GMT"), new Date("02 Jun 2019 00:00:00 GMT"), "12 st.", ["asdf"], ["admin"])
//     expect(tag.get_events()).toEqual([event2]);
//     event2.set_tags(['test']);
//     expect(tag.get_events()).toEqual([]);
// });

// test('tag test: followers!', function() {
//     // name must be any string of characters of length > 0.
//     const tag = new Tag(1, "asdf")
//     y = new User(null, "bobby1234", "bobby", "johnson", "bobbyjohnson@gmail.com", (new Date('2019-01-02')), "Fonghong28", 0, []);
//     expect(tag.get_followers()).toEqual([])
//     // add
//     expect(tag.add_follower(y)).toBeTruthy()
//     expect(tag.get_followers()).toEqual([y])
//     //don't add duplicates
//     expect(tag.add_follower(y)).toBeFalsy()
//     expect(tag.get_followers()).toEqual([y])
//     // Remvoe
//     expect(tag.remove_follower(usr)).toBeTruthy()
//     expect(tag.get_followers()).toEqual([])
//     // Don't remove if not in list.
//     expect(tag.remove_follower(usr)).toBeFalsy()
//     expect(tag.get_followers()).toEqual([])

//     //Check that this is tag is in user's followers
//     expect(y.get_followers().includes("asdf").toBeTruthy())
//     expect(y.get_followers().includes("wdawudhwahda").toBeFalsy())
// });
