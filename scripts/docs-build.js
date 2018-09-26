const fs = require('fs-extra-promise');
const path = require('path');
const exec = require('child_process').exec;
const _ = require('lodash');
const Promise = require('bluebird');
const PromisedHandlebars = require('promised-handlebars');
const Handlebars = PromisedHandlebars( require('handlebars'), {Promise} );

Handlebars.registerHelper('path', function(namespace, options) {
	return namespace.split('/').join( path.sep );
});

Handlebars.registerHelper('readme', function(options) {
	var pathReadMe = path.resolve( options.data.root.__dirname, 'README.rst' );

	return fs.existsAsync( pathReadMe )
	.then( exists => {
		return !exists ? '' : 
			fs.readFileAsync( pathReadMe, 'utf8' )
			.then( data => new Handlebars.SafeString( data ) );
	});
});

Handlebars.registerHelper('list', function(extname, type, options) {
	type = Handlebars.Utils.escapeExpression(type);
	extname = Handlebars.Utils.escapeExpression(extname);

	//read all the files in the dir
	const {dirPage,namespace,page} = options.data.root;
	return getDirContent( dirPage )
	.then( contents => {
		//iterate over all of the files
		return Promise.mapSeries( 
			_.filter( contents.files, file => path.extname( file ) == extname ),
			( file ) => {
				//find the functions for this file
				return fs.readFileAsync( file, 'utf8' )
				.then( data => {
					return {
						file : file,
						functions : (() => {
							const REG_EXP_FUNC = /\@function/g;
							let match;
							let result = []; 
							
							while( (match = REG_EXP_FUNC.exec( data )) !== null) {
								//extract the function name - up to the next line break
								let indexFuncNameStart = match.index + match[0].length;
								result.push( _.trimStart( data.substring( indexFuncNameStart, data.indexOf('\n', indexFuncNameStart ) ) ) );
							}

							return result;
						})(),
						classes : (() => {
							const REG_EXP_CLASS = /class ([a-zA-Z0-9]+)/g;
							let match;
							let result = []; 
							
							while( (match = REG_EXP_CLASS.exec( data )) !== null) {
								//extract the function name - up to the next line break
								result.push( match[1] );
							}

							return result;
						})()
					}
				} );
			}
		).then( results => {
			//map over the results converting each reference into a string
			return _.map( results, result => {
				let pathRelative = path.relative( dirPage, result.file );
				let baseName = path.basename( pathRelative, extname );
				
				const title = '';//`\n\n${_.capitalize(baseName)}\n===============================\n`;

				switch( type ){
					case 'function':
					case 'functions':
						return new Handlebars.SafeString(`${title}${
							_.map( result.functions, func => {
								return `.. js:autofunction:: ${namespace}${baseName}.${func}`;
							} ).join('\n')
						}`);
					break;

					case 'class':
					case 'classes':
						return new Handlebars.SafeString(`${
							_.map( result.classes, className => {
								return `- :doc:\`${namespace}${className}.${className} <${className}>\``;
							} ).join('\n')
						}`);
					break;
				}
				
				
			}).join('\n');
		} );
	} );
	
});


//crawl through all the directories and look for files
checkDir( path.resolve( __dirname, '..' ), {
	ignore : [
		path.resolve( __dirname, '..', '.git' ),
		path.resolve( __dirname, '..', '.storybook' ),
		path.resolve( __dirname, '..', 'docs' ),
		path.resolve( __dirname, '..', 'node_modules' )
	],
	output : path.resolve( __dirname, '..', 'docs', 'source' )
} )
.then( result => console.log( `built docs...\nrun 'yarn app:export'` ) );

//HELPER FUNCTIONS
const REGEXP_BASENAME_RST_TEMPLATE = /^\_([0-9a-zA-Z\-]+.rst)$/;
function checkDir( dir, options ){
	options.input = options.input || dir;
	//check for the existance of a _.rst file
	const dirOutput = path.resolve( options.output, path.relative( options.input, dir ) );

	//delete the output directory
	return Promise.resolve()
	.then( () => {
		return dirOutput != options.output ? fs.removeAsync( dirOutput ) : null; 
	} )
	.then( () => {
		return getDirContent( dir, options );
	} )
	.then( content => {
		//of the files see if any are an rst file
		return Promise.mapSeries( content.files, file => {
			const baseName = path.basename( file );
			
			//we will have 2 types of file to interpret _index.rst/_template.rst
			switch( baseName ){
				case '_template.js.rst':
					return processTemplate( file, options )
					.then( result => file );	
				break;
				case '_index.rst':
					if( REGEXP_BASENAME_RST_TEMPLATE.test( baseName ) ){
						return processPage( file, options )
						.then( result => file );	
					}else{
						return file;
					}
				break;
				default:
					//important - do nothing with anything else
					return null;
				break;
			}
		} ).then( result => content )
	} )
	.then( content => {
		//walk the dirs
		return Promise.mapSeries( content.dirs, dir => checkDir( dir, options ) )
	} )
}

function getDirContent( dir, options ){
	options = options || {};

	return fs.readdirAsync( dir )
	.then( items => _.map( items, item => path.resolve( dir, item ) ) )
	.then( items => {
		return _.filter( items, item => {
			return _.includes( options.ignore, item ) ? false : true;
		} );
	} )
	.then( items => {
		//split into files and dirs
		const output = {files:[],dirs:[]};
		return Promise.mapSeries( items, item => {
			return fs.isDirectoryAsync( item ).then( isDirectory => {
				output[ isDirectory ? 'dirs' : 'files' ].push( item );
				return item;
			} )
		} ).then( result => output );
	} )
}

function cloneFile( fileInput, options ){
	//work out the directory structure
	const dirFile = path.dirname( fileInput );
	const dirOutput = path.resolve( options.output, path.relative( options.input, dirFile ) );
	const fileOutput = path.join( dirOutput, path.basename( fileInput ) );
	//copy the file across
	return fs.copyAsync( fileInput, fileOutput );
}

function processTemplate( template, options ){
	//create a file for each matching file in the current directory
	var templateExtName = path.extname( path.basename( template, path.extname( template ) ) );
	
	//search for files with this extension that we can use the template against
	var dirName = path.dirname( template );
	return getDirContent( dirName )
	.then( contents => {
		return _.filter( contents.files, file => {
			return path.extname( file ) == templateExtName ? true : false;
		} );
	} )
	.then( files => {

		const dirTemplate = path.dirname( template );
		const namespace = pathAsNamespace( path.relative( options.input, dirTemplate ) );
		const dirOutput = path.resolve( options.output, path.relative( options.input, dirTemplate ) );
	
		//create a file for each using the template provided
		return fs.ensureDirAsync( dirOutput )
		.then( () => fs.readFileAsync( template, 'utf8' ) )
		.then( ( data ) => {
			return Handlebars.compile( data );
		})
		.then( ( template ) => {
			return Promise.mapSeries( files, file => {
				const baseName = path.basename( file );
				const pathOutput = path.resolve( dirOutput, `${path.basename( baseName, path.extname( baseName ) )}.rst` );
	
				const properties = {
					file : file,
					namespace : namespace,
					name : path.basename( baseName, path.extname( baseName ) ),
					dirTemplate : dirTemplate,
					__dirname : dirTemplate,
					dirOutput : dirOutput,
					pathOutput : pathOutput
				};
				
				//read in the 
				return template( properties )
				.then( output => {
					fs.writeFileAsync( pathOutput, output );
				} );
			} )
		} )
		

		
	} )
}

function processPage( page, options ){
	//pull out the values we want
	const baseName = path.basename( page );
	const dirPage = path.dirname( page );
	const namespace = pathAsNamespace( path.relative( options.input, dirPage ) );

	const dirOutput = path.resolve( options.output, path.relative( options.input, dirPage ) );
	const pathOutput = path.resolve( dirOutput, REGEXP_BASENAME_RST_TEMPLATE.exec( baseName )[1] );

	const properties = {
		page : page,
		namespace : namespace,
		dirPage : dirPage,
		__dirname : dirPage,
		dirOutput : dirOutput,
		pathOutput : pathOutput
	};
	
	//read in the 
	return fs.ensureDirAsync( dirOutput )
	.then( result => fs.readFileAsync( page, 'utf8' ) )
	.then( data => {
		const template = Handlebars.compile( data );
		return template( properties )
		.then( output => {
			fs.writeFileAsync( pathOutput, output );
		} )
	} );
}

function pathAsNamespace( data ){
	return (data + path.sep).split( path.sep ).join('/');
}