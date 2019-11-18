/* Tag Class implementation */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';
import Event from './event';

function is_valid_name(name) { return (typeof name === 'string' && name.length > 0) }

export default class Tag extends Followable {

    constructor(TagID, name) {
        super(TagID, name)
        this.name = name
        this.ID = TagID
        this.events = []
        if (!is_valid_name(name)) {this.name = null; this.ID = null; this.events = null}
    }

    get_name() { return this.name }
    set_name(name) { if (is_valid_name(name)) { this.name = name; return true; } else return false; }
    get_id() { return this.ID }
    async get_events() { await this.update_events(); return this.events }
    set_events(evts) {this.events = evts; }

    async update_events() {
        fetch('http://hot-backend.herokuapp.com/events/tags/'.concat(this.name), {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var l = [];
            for (i in responseJson) {
                i = responseJson[i][0]
                l.push(new Event(i['_id'], i['name'], i['desc'], 
                                 i['start_date'], i['end_date'], 
                                 i['addr'], i['tags'], i['admins']));
            }
            this.set_events(l);
            console.log(l);
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        });
    }
}
