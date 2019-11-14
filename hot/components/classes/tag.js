import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followable from './followable';

function is_valid_name(name) { return (typeof name === 'string' && name.length > 0) }
function is_valid_id(id) { return (typeof id === 'number' && id > 0) }

export default class Tag extends Followable {

    constructor(TagID, name) {
        super(TagID, name)
        this.get_events()
        if (!is_valid_name(name) || !is_valid_id(TagID)) {this.name = null; this.ID = null; this.events = null}
    }

    get_name() { return this.name }
    //set_name(name) { if (is_valid_name(name)) { this.name = name; return true; } else return false; }
    get_id() { return this.ID }

    async get_events() {
        fetch('http://hot-backend.herokuapp.com/evets/tags/'+this.name, {
            method: 'GET',
        }).then((response) => response.json())
        .then((responseJson) => {
            var l = [];
            for (i in responseJson) {
                i = responseJson[i]
                l.push(new Event(i['_id'], i['name'], i['desc'], 
                                 i['start_date'], i['end_date'], 
                                 i['addr'], i['tags'], i['admins']));
                return l;
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}
