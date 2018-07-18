import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Restaurants } from '../api/restaurants.js';

import './body.html';
Template.body.onCreated(function bodyOnCreated() {
    //this.state = new ReactiveDict();
    Meteor.subscribe('restaurants');
});

Template.body.helpers({
    //restaurant() need to be same as db name
    restaurants() {
        return Restaurants.find({});

        // Show newest tasks at the top
        //return Tasks.find({}, {sort: {createdAt: -1}});
    },
});
