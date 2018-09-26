var path = require('path');

module.exports = {
	entry: {
		'index.html' : entryFile('./server/views/index.pug'),
	},
	output: {
		path: path.join( __dirname, 'public'),
		filename: '[name].[ext]'
	}
}

function entryFile( file ){
	return path.resolve( __dirname, file );
}