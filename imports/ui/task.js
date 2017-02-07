import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.html';

Template.task.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    },
});

Template.task.events({
    'click .delete' () {
        Meteor.call('removeMessage', this._id);
    },
});
