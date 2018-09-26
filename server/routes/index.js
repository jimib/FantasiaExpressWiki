const express = require('express');
const path = require('path');

const app = module.exports = express();

/**
 * @function \/
 * @route {GET} /
 * @description Renders a basic page with the React App Bundle embedded
 */

app.set('views', path.join( __dirname, '..', 'views' ) );

app.get( '/', ( req, res, next ) => {
	res.render('index', {
		scripts : ['bundles/app.bundle.js']
	});
});

//connect up subroutes
const auth = require('./auth');
app.use( auth );
app.use( '/api', auth.verify(), require('./api') );