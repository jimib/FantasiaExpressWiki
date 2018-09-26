const {spawn} = require('child_process');
const path = require('path');

var hasQuit = false;

function processQuit(){
	if( !hasQuit ){
		hasQuit = true;
		process.quit();
	}	
}
	
const process = spawn( 'pixel-application.exe', {cwd:__dirname} );

const EVENTS_QUIT = ['exit','error','close'];
for( var i = 0 ; i < EVENTS_QUIT.length; i++ ){
	(function( eventName ){
		process.on( eventName, function(){
			console.log( eventName, arguments );
		} );
	})(EVENTS_QUIT[i])
}

process.stdout.on('data', data => process.stdout.write( data ) );
process.stderr.on('data', data => process.stderr.write( data ) );