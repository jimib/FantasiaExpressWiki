const path = require('path');
const libs = require('@pixel-inspiration/common-libs');
// load configs
global._config = libs.config( path.resolve( __dirname, '../../config.js') );
const CONTROLLER = require('../../server/controllers/users');

describe('Test Controller for users', function(){
	it('Should provide getUsers', function(){
		return CONTROLLER.getUsers()
		.then( users => {
			console.assert( Array.isArray(users), 'Expected to receive an array of users' );
		} );
	});
	
} );
