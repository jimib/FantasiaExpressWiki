/*
//install node-windows globally
yarn global add node-windows
//link to local project
npm link node-windows
//install
node install
*/

var Service = require('node-windows').Service;
var path = require('path');

var svc;

switch( 'node' ){
	case 'node':
		/*
			OPTION 1 - running Node app directly
		*/

		const pckg = path.resolve( __dirname, '..' , 'package.json' );
		svc = new Service({
			name : pckg.name,
			description : 'Application developed by Pixel Inspiration',
			script : path.resolve( __dirname, '..' , 'app.js' ),
			nodeOptions : [
			]
		});
		break;
	case 'exe':
		/*
			OPTION 2 - running an exe (usually a bundled node app)
		*/
		svc = new Service({
			name : 'Pixel Application',
			description : 'Application developed by Pixel Inspiration',
			script : path.resolve( __dirname, 'service-runner.js' ),
			nodeOptions : [
			]
		});
	break;
}

svc.on('install', function(){
	svc.start();
});

svc.install();