let fs = require('fs-extra-promise');
let path = require('path');
let _ = require('lodash');

//find the .bablerc for velocity-react and remove 'es2015'
let pathToVeloctyReactBabel = path.resolve('node_modules','velocity-react','.babelrc');

fs.existsAsync( pathToVeloctyReactBabel )
.then( exists => {
	//if the module exists then remove reference to es2015
	return exists ? fs.readFileAsync( pathToVeloctyReactBabel )
	.then( data => {
		console.log(`Removing 'es2015' from 'node_modules/velocity-react'`);
		data = data.toString().replace(`, 'es2015'`, ``);
		return fs.writeFileAsync( pathToVeloctyReactBabel, data );
	} ) : null;
} )