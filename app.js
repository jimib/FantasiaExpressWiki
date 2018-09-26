const express = require('express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const libs = require('@pixel-inspiration/common-libs');

//CONSTANTS
const DIR_APP = __dirname;
const DIR_CWD = process.cwd();


global._config = libs.config( path.resolve( DIR_APP, 'config.js' ), path.resolve( DIR_CWD, 'config.local.js' ) );
//additional configuration via command line - override default information
libs.commands( _config );
//add details from the package
_.assign( _config, _.pick( require( path.resolve( DIR_APP, 'package.json' ) ), 'name', 'version' ) );

//connect the server
require('./server');
