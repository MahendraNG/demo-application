/* eslint-env mocha */


import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Tasks } from './tasks.js';

import { Accounts } from 'meteor/accounts-base';
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isServer) {
    describe('Messages', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test messages',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                });
            });

            it('can delete owned messages', () => {
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const deleteTask = Meteor.server.method_handlers['removeMessage'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = {
                    userId
                };

                // Run the method with `this` set to the fake invocation
                deleteTask.apply(invocation, [taskId]);

                // Verify that the method does what we expected
                assert.equal(Tasks.find().count(), 0);
            });

            it('can insert messages', () => {
            	taskId = Tasks.insert({
                    text: 'test messages',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                });

                Tasks.remove(taskId)

            });

        });

    });
}


if(Meteor.isClient) {

	// list of all messages
	describe('Messages', () => {
		describe('methods', () => {
		  	it('list of messages', function () {
		  		Tasks.find({})
		  	});
		})
	})

	// to create new demo user
	describe('Accounts', function () {
	  beforeEach(function () {
	    resetDatabase();
	  });

	  it('should be able to create a user', function () {
	    const createUser = new Promise((resolve, reject) => {
	      Accounts.createUser({
	        username: 'demo',
	        email: 'demo@demo.com',
	        password: 'demopassword',
	      }, (error) => {
	        if (error) {
	          reject(error);
	        } else {
	          const newUser = Meteor.users.findOne();
	          resolve(newUser);
	        }
	      });
	    });
	    return createUser.then(function (newUser) {
	      expect(newUser).to.not.be.undefined;
	      expect(newUser.username).to.equal('demo');
	    });
	  });

	});
}




