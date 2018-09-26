const path = require('path');
const exec = require('child_process').exec;
const Promise = require('bluebird');

const PATH_DOCS = path.resolve( __dirname, '..', 'docs' );

Promise.mapSeries([
	() => execPromise(`make clean`, {cwd:PATH_DOCS}),
	() => execPromise(`make html`, {cwd:PATH_DOCS})
], handler => handler() )
.then( done => {
	console.log('done');
});

function execPromise( command, options ){
	console.log( command );
	//wrap the call in a promise
	return new Promise( (resolve, reject) => {
		exec( command, options, ( err, stdout, stderr ) => {
			//normalise the result
			stdout = stdout.toString();
			stderr = stderr.toString();
			//reject the error
			if( err || stderr.length > 0 ){
				reject( err || stderr );
			}else{
				resolve( stdout );
			}
		} );
	} );
}