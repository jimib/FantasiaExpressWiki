const express = require('express');
const path = require('path');
const _ = require('lodash');

const app = module.exports = express();

/**
 * @function \/
 * @route {GET} /
 * @description Renders a basic page with the React App Bundle embedded
 */

app.set('views', path.join( __dirname, '..', 'views' ) );

app.get( '/', ( req, res, next ) => {
	res.render('index', {
		styles : ['//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css'],
		scripts : ['bundles/app.bundle.js'],
		variables: {
			config : _.pick( _config, 'isDev' )
		}
	});
});

//connect up subroutes
const auth = require('./auth');
app.use( auth );
app.use( '/api', require('./api') );