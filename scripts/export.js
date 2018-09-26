let fs = require('fs');
let path = require('path');
var EasyZip = require('easy-zip2').EasyZip;
var zip = new EasyZip();

const libs = require('@pixel-inspiration/common-libs');
const commands = libs.commands({});
//DECALRE ROOT
const dirExport = path.resolve( __dirname, 'bin' );

!fs.existsSync( dirExport ) && fs.mkdirSync( dirExport );

zip.zipFolder('./public/' , {rootFolder : ''} ,function(){
	zip.writeToFile( path.join( dirExport, commands.name || 'export.wgt' ) );
});