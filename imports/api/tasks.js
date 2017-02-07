import { Meteor }
from 'meteor/meteor';

import { Mongo }
from 'meteor/mongo';

import { check }
from 'meteor/check';

export const Tasks = new Meteor.Collection('tasks');

if (Meteor.isServer) {
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({});
    });

    Tasks.allow({
        'insert': function() {
            return true;
        }
    });
}

Meteor.methods({

    'removeMessage' (taskId) {
        check(taskId, String);

        const task = Tasks.findOne(taskId);

        if (task.owner !== this.userId) {
            throw new Meteor.Error('not authorized user to delete this message.');
        }

        Tasks.remove(taskId);
    },
});
