const _ = require('lodash'),
	path = require('path'),
	fs = require('fs-extra');
//this prepares the environment before we start the app
const package = require('./package.json');

const DIR_APP_EXTERNAL = path.resolve('./');
const DIR_APP_INTERNAL = path.resolve( __dirname );
//get the pkg list of assets - any node_modules need exporting
const REG_EXP_MODULE = /^node_modules\/([a-zA-Z0-9\-]+)\//;
const MODULES = {};

const extractedModules = _.filter( _.map( package.pkg.assets, ( asset ) => {
	if( REG_EXP_MODULE.test( asset ) ){
		//get the name of the module
		var moduleName = REG_EXP_MODULE.exec( asset )[1];
		extractModule( moduleName );
		//RETURN THIS AS A DEPENDENCY
		return moduleName;
	}
} ) );

/**
 * PROBLEM - BY IMPORTING THIS WAY THE MODULE IS MASKED FROM PKG AND ISN'T INCLUDED IN THE EXE
 * WHICH MEANS WE CAN'T EXTRACT IT AT RUN TIME. THE SOLUTION IS FOR US TO CREATE A LIST OF DEPENDENCIES
 * AND THEN CREATE A DYNAMIC FILE/ WRITE IT/ THEN IMPORT IT
 */

if( DIR_APP_EXTERNAL == DIR_APP_INTERNAL ){
	fs.writeFileSync( './launcher.dependencies.js', _.map( extractedModules, module => {
		return `require('${module}')`
	} ).join('\n') );
	//now require the dependencies which PKG will pick up on - NOTE - don't convert './launch.dependencies.js' to a VARIABLE NAME!!
	//ONLY WHEN IN BUILD MODE 
	require( './launcher.dependencies.js' );
}

//override and remap the require statement
global._require = function( moduleName ){
	//if we have an exported module then use that one
	return require( MODULES[ moduleName ] || moduleName );
}

//import the app to start things off
require('../app');
		
//HELPER
function extractModule( moduleName ){
	if( !MODULES[moduleName] ){
		//get the src and the target 
		var modulePath = path.join( 'node_modules', moduleName ),
			modulePathSrc = path.join( DIR_APP_INTERNAL, modulePath ),
			modulePathTarget = path.join( DIR_APP_EXTERNAL, modulePath );
		//record this name
		MODULES[moduleName] = modulePathTarget;
		//extract this resource
		if( modulePathSrc == modulePathTarget ){
			//console.log(`Not extracting '${moduleName}'`);
		}else{
			console.log(`Extracting '${moduleName}'`);
			fs.copySync( modulePathSrc, modulePathTarget );
		}
		//read the package file and check for other dependencies
		var package = require( path.join( modulePathSrc, 'package.json' ) );
		_.each( package.dependencies, (moduleVersion, moduleName) => {
			//import this module too if it's not already been extracted
			extractModule( moduleName );
		} );
	}
}