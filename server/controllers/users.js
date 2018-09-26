const _ = require('lodash');
/**
 * @function getUsers
 * @param {object} options 
 * @description Get User Records in the Stack up to the specified limit
 */

let users = [
	{firstname:'Ben',lastname:'X'},
	{firstname:'Peter',lastname:'J'},
	{firstname:'Jason',lastname:'B'},
	{firstname:'Michael',lastname:'K'}
]

// Get User Records in the Stack up to the specified limit
exports.getUsers = ( options ) => {
	options = options || {};
	return new Promise( ( resolve, reject ) => {
		resolve( users );
	} );
};

/**
 * @function getUserById
 * @param {number} id 
 * @param {object} options 
 * @description Get User Records in the Stack up to the specified limit
 */
// Get User Records in the Stack up to the specified limit
exports.getUserById = ( id, options ) => {
	options = options || {};
	return new Promise( ( resolve, reject ) => {
		resolve( _config.users );
	} );
};
