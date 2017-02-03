import { Accounts } from 'meteor/accounts-base';

// use usernames instead of email addresses
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});