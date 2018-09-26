
import { push } from 'connected-react-router';

import * as api from '../api';

import {showError, catchError} from './ErrorAction';
import {createRoutePath} from '../utils/PathUtil';

import {
	PATH_ROOT
} from '../constants/PathConstants';

import {
	USER_ADDED,
	USER_UPDATED,
	USER_REMOVED,
	ERROR_SHOW,
	USERS_LOAD_BEGIN,
	USERS_LOAD_FAIL,
	USERS_LOAD_SUCCESS
} from '../constants/ActionsConstants';

export const addUser = user => {
	return ( dispatch, getState ) => {
		return dispatch( userAdded( user ) );
	};
}

export const removeUser = user => {
	return ( dispatch, getState ) => {
		return dispatch( userRemoved( user ) );
	};
}

export const updateUser = user => {
	return ( dispatch, getState ) => {
		return dispatch( userUpdated( user ) );
	};
}

export const loadUsers = () => {
	return ( dispatch, getState ) => {
		//notify that we're loading
		dispatch( usersLoadBegin() );
		//make the request
		api.getUsers()
		.then( users => dispatch( usersLoadSuccess( users ) ) )
		.catch( err => {
			//handle the error
			dispatch( usersLoadFail( err ) );
			dispatch( showError( err ) );
		})
	};
}


const userAdded = user => ({
	type : USER_ADDED,
	user
});

const userUpdated = user => ({
	type : USER_UPDATED,
	user
});

const userRemoved = user => ({
	type : USER_REMOVED,
	user
});

const usersLoadBegin = () => ({
	type : USERS_LOAD_BEGIN
});

const usersLoadSuccess = users => ({
	type : USERS_LOAD_SUCCESS,
	users
});

const usersLoadFail = error => ({
	type : USERS_LOAD_FAIL,
	error
});