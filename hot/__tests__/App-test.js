/**
 * @format
 */

import 'react-native';
import React from 'react';
import {App, Event, Community, User} from '../App';

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

//it('renders correctly', () => {
  //renderer.create(<App />);
//});

test('name!', function () {
    const user = new User("")
    expect(user.get_username()).toBe('')
    expect(user.set_username('asdf')).toBeTruthy()
    expect(user.get_username()).toBe('asdf')
});


test('community name!', function () {
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

test('community privacy!', function () {
    const c = new Community("name", 0)
    expect(c.get_privacy()).toBe(0)
    expect(c.set_privacy("asdf")).toBeFalsy()
    expect(c.get_privacy()).toBe(0)
    expect(c.set_privacy(0)).toBeTruthy()
    expect(c.get_privacy()).toBe(0)
    expect(c.set_privacy(1)).toBeTruthy()
    expect(c.get_privacy()).toBe(1)
});

test('member functionality!!', function () {
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


test('event functionality!!!', function () {
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

