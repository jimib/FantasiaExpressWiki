const express = require('express');
const path = require('path');
const request = require('request');
const libs = require('@pixel-inspiration/common-libs');
const bodyParser = require('body-parser');
const session = require('express-session');
const _ = require('lodash');

const app = module.exports = express();

//parse incoming json
app.use( session({secret: 'secret'}) );

//sample end point
app.get('/auth/session', (req, res, next) => {
	//additional middleware
	libs.api.extendResponse( res );
	res.api( null, req.session.user || null );
})

app.post('/auth/login', bodyParser.json(), (req, res, next) => {
	//additional middleware
	libs.api.extendResponse( res );
	//which user
	const {username,password} = req.body;
	console.log( req.body );
	//check the details
	if( username == 'admin' && password == 'admin' ){
		req.session.user = {username};
		res.api(null,{username});
	}else{
		res.api('Username and password did not match');
	}
});

//log the user out
app.all('/auth/logout', bodyParser.json(), (req, res, next) => {
	//additional middleware
	libs.api.extendResponse( res );
	//check the details
	req.session.destroy();
	res.api(null,'Logged out');
});

//provide method for other modules to verify authentication
app.verify = ( role ) => ( req, res, next ) => {
	if( req.session.user ){
		next();
	}else{
		next('Not authenticated');
	}
}