#!/usr/bin/env node

"use strict";
const _ = require('lodash');
const pug = require('pug');
const path = require('path');
const fs = require('fs-extra-promise');

var config = require('./html.config');
var dirOutput = config.output.path;
var filenameOutput = config.output.filename || '[name].[ext]';

fs.ensureDirAsync( dirOutput ).then( success => {
	//build each entry file
	Promise.all( _.map( config.entry, ( value, id ) => {
		var pathOutput = path.join( dirOutput, convertFilename( filenameOutput, id ) );
		return fs.writeFile( pathOutput, pug.compileFile( value, {pretty:true} )() );
	} ) )
	.then( success => console.log('html ready...') );
});


function convertFilename( fileName, target ){
	var parts = {
		dir : path.dirname( target ),
		name : path.basename( target, path.extname( target ) ),
		ext : path.extname( target ).split('.').join('')
	}

	for( var id in parts ){
		fileName = fileName.split(`[${id}]`).join( parts[id] );
	}

	return fileName;
}