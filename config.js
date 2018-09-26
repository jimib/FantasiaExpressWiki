const libs = require('@pixel-inspiration/common-libs');
const commands = libs.commands();
const {password} = commands;

module.exports =  {
	port : 4000,
	isDev : false,
	enableHotloading : false,
	scala : {
		protocol : "https",
		host : "scalabeta.pixelinspiration.co.uk",
		auth : {
			username : libs.encryption.parse("encrypted(c1ddcad1)", password),
			password : libs.encryption.parse("encrypted(c1ddcad1)", password)
		}
	}
}