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

const user = new User("")
test('name!', function () {
    expect(user.get_username()).toBe('')
    expect(user.set_username('asdf')).toBe(true)
    expect(user.get_username()).toBe('asdf')
});
