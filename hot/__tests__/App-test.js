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
    const community = new Community("", 0)
    expect(community.get_name()).toBe('')
    expect(community.set_name("asdf")).toBeTruthy()
    expect(community.get_name()).toBe('asdf')
    expect(community.set_name(0)).toBeFalsy()
});

test('community privacy!', function () {
    const community = new Community("", 0)
    expect(community.get_privacy()).toBe(0)
    expect(community.set_privacy("asdf")).toBeFalsy()
    expect(community.get_privacy()).toBe(0)
    expect(community.set_privacy(0)).toBeTruthy()
    expect(community.get_privacy()).toBe(0)
    expect(community.set_privacy(1)).toBeTruthy()
    expect(community.get_privacy()).toBe(1)
});

test('member functionality!!', function () {
    const community = new Community("", 0)
    const evt = new Event("", "", "", "", "", "")
    const user = new User("")
    expect(community.get_members()).toHaveLength(0)
    expect(community.add_member(user)).toBeTruthy()
    expect(community.add_member(user)).toBeFalsy()
    expect(community.add_member(evt)).toBeFalsy()
    expect(community.get_members()).toHaveLength(1)
    expect(community.set_members([])).toBeTruthy()
    expect(community.get_members()).toHaveLength(0)
    expect(community.set_members([user])).toBeTruthy()
    expect(community.set_members([evt])).toBeFalsy()
    expect(community.get_members()).toHaveLength(1)
    expect(community.is_member(user)).toBeTruthy()
    expect(community.remove_member(user)).toBeTruthy()
    expect(community.remove_member(user)).toBeFalsy()
    expect(community.is_member(user)).toBeFalsy()
});


test('event functionality!!', function () {
    const community = new Community("", 0)
    const evt = new Event("", "", "", "", "", "")
    const user = new User("")
    expect(community.get_events()).toHaveLength(0)
    expect(community.add_event(evt)).toBeTruthy()
    expect(community.add_event(evt)).toBeFalsy()
    expect(community.add_event(user)).toBeFalsy()
    expect(community.get_events()).toHaveLength(1)
    expect(community.set_events([])).toBeTruthy()
    expect(community.get_events()).toHaveLength(0)
    expect(community.set_events([evt])).toBeTruthy()
    expect(community.set_events([user])).toBeFalsy()
    expect(community.get_events()).toHaveLength(1)
    expect(community.is_event(evt)).toBeTruthy()
    expect(community.remove_event(evt)).toBeTruthy()
    expect(community.remove_event(evt)).toBeFalsy()
    expect(community.is_event(evt)).toBeFalsy()
    expect(community.create_event("", "", "", "", "", "")).toBeTruthy()
    expect(community.get_events()).toHaveLength(2)
});

