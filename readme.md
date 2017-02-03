
demo-application

A simple demo application for post messages and delete

To run this application you just need to install meteor by typing following command in ubuntu terminal

		curl https://install.meteor.com/ | sh

once you meteor install then clone this repository.

then navigate to demo-application directory and type

		meteor npm install

this will install all the dependant packages that is defined in packages file inside .meteor

once you have installed all dependancies then run
		meteor

in your terminal to run this application.

for user management we use meteor package "accounts-ui".

--- To run test cases ---

I used practicalmeteor:mocha package for testing, and this package already mentioned in the packages file so you dont need to install it seprately.

to run the mocha test you just need to type following command

		meteor test --driver-package=practicalmeteor:mocha

this will execute all written test cases in this application.

