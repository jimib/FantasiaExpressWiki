const express = require('express');
const path = require('path');
const request = require('request');
const libs = require('@pixel-inspiration/common-libs');
const bodyParser = require('body-parser');
const _ = require('lodash');
const uuid = require('uuid');

const app = module.exports = express();

const { getUsers } = require('../../controllers/users');

//additional middleware
libs.api.extendApp( app );

//parse incoming json
app.use( bodyParser.json() );
app.set('views', path.join( __dirname, '..' , '..', 'views' ) );
//sample end point


/**
 * @function users{GET}
 * @description Returns array of users
 * @returns {Array<Users>}
 */
app.get('/users', ( req, res, next ) => {
	res.api.promise( getUsers() );
} );

var SCHEMA_CREATE_USER = libs.schema.createSchema(
	{
		name : libs.schema.createString({optional:false}),
		password : libs.schema.createString({optional:false})
	}
)

/**
 * @function users{POST}
 * @description Create new user
 * @returns {object} user
 */
app.post('/users', ( req, res, next ) => {
	res.api.promise( 
		SCHEMA_CREATE_USER.validate( req.body )
		.then( user => {
			user.id = uuid();
			return user;
		} )
	 );
});
