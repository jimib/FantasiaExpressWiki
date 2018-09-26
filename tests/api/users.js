const path = require('path');
const request = require('supertest');
const libs = require('@pixel-inspiration/common-libs');
// load configs
global._config = libs.config( path.resolve( __dirname, '../../config.js') );

const REQUEST = request( require('../../app/api') );

describe('Test API for users', function(){
	it('Should be able to load a list of users', function(){
		return GET('/users')
		.then( users => {
			console.assert( Array.isArray(users), 'Expected to receive an array of users' );
		} )
	});
	
	it('Should be able to create a user', function(){
		const user = {
			name : 'Jimi',
			password : 'Guest'
		}
		return POST('/users', user)
		.then( user => {
			console.assert( user, 'Expected to create a user' );
			console.assert( user.id, 'Expected to create a user with an id' );
		} )
	});

	it('Should be fail to create an invalid user', function(){
		const user = {
			name : 'Jimi'
		}
		return POST('/users', user)
		.then( user => {
			throw new Error('Should have failed to create user with missing password');
		}, err => {
			return true;
		} )
	});
} );

//HELPERS
function GET( url ){
	return VALIDATE( REQUEST.get( url ) );
}

function POST( url, data ){
	return VALIDATE( REQUEST.post( url ).send( data ) );
}

function VALIDATE( req ){
	return req
	.set('Accept', 'application/json')
	.expect(200)
	.then( res => {
		var {body} = res;
		var {status,error,result} = body;
		switch( status ){
			case 'ok':
				return result;
			break;
			case 'error':
				throw new Error( error || `Unknown error`);
			break;
			default:
				throw new Error(`Unknown status '${status}'`);
			break;
		}
	} );
}