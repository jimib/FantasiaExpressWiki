const path = require('path');
const libs = require('@pixel-inspiration/common-libs');
const Scala = require('pixel-scala-api');

const config = libs.config( path.resolve('./config.json'), path.resolve('./config.secret.json') );
const commands = libs.commands( config );

const configScalaServer = config.scala;
console.log( JSON.stringify( config, null, '\t' ) );

const scala = new Scala( configScalaServer );
const {username, password} = configScalaServer.auth;

scala.login( username, password )
.then( data => {
	//upload the inventory file
	var filename = config.name || "export.wgt";
	var filepath = path.resolve('./dist',filename);

	return scala.fileUpload.uploadMediaItem( filepath, {
		filename : filename
	} ).catch( err => console.error('Error uploading', err) );
} )
.catch( err => console.log('logInError', err ) );
