import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';

import '../ui/task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('tasks');
});


Template.body.helpers({
    tasks() {
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
});

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        Meteor.call('insertMessages', text);

        // Clear form
        target.text.value = '';
    },
});