module.exports = {
	init : function( options ){
		return new Db();
	}
}

function Db( options ){

}

Db.prototype.connect = function(){
	return Promise.resolve();
}