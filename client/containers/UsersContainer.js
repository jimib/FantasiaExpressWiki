import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	login,
	logout,
	getStatus
} from '../actions/SessionAction';

import { hideError } from '../actions/ErrorAction';

import Users from '../components/Users';
import { 
	loadUsers,
	addUser,
	updateUser,
	removeUser,
} from '../actions/UsersAction';

const mapStateToProps = state => {
	return ({
		users : state.users.items,
		error : state.users.error,
		loading : state.users.loading
	});
}

const mapDispatchToProps = dispatch => ({
	loadData : () => {
		dispatch( loadUsers() )
	},
	//called when we want to add a new user
	addUser : ( user ) => dispatch( addUser( user ) ),
	//called when we want to remove a user
	removeUser : ( user ) => dispatch( removeUser( user ) ),
	//called when we want to update a user
	updateUser : ( user ) => dispatch( updateUser( user ) )
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	Users
);
