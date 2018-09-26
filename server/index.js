const express = require('express');
const path = require('path');
const pug = require("pug");
const libs = require('@pixel-inspiration/common-libs');

//start up express
const app = module.exports = express();

//configure the render engine
app.set('view engine', 'pug');
app.set('views', path.join( __dirname, 'views' ) );

//bind the express routes
app.use( require('./routes') );

//proxy on to the hotloading server
if( _config.enableHotloading ){
	console.log('enable proxy');
	var proxy = require('http-proxy-middleware');
	app.use( proxy({target: 'http://localhost:8080', changeOrigin: true}) );
}

//expose public directories
app.use( express.static( path.join( __dirname, '..', 'public' ) ) );

//connect the application to it's port
console.log('starting server');
libs.server.connectAppToPort( app, _config.port, ( err ) => {
	if (err) {
		return console.error(err);
	}else{
		console.log(`Listening at http://localhost:${_config.port}`);
	}
} );
