import { Meteor }
from 'meteor/meteor';

import { Mongo }
from 'meteor/mongo';

import { check }
from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [{
                private: {
                    $ne: true
                }
            }, {
                owner: this.userId
            }, ],
        });
    });
}

Meteor.methods({
    'insertMessages' (text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },

    'removeMessage' (taskId) {
        check(taskId, String);

        const task = Tasks.findOne(taskId);

        if (task.owner !== this.userId) {
            throw new Meteor.Error('not authorized user to delete this message.');
        }

        Tasks.remove(taskId);
    },
});
