import { push } from 'connected-react-router';

import {showError,catchError} from './ErrorAction';
import {createRoutePath} from '../utils/PathUtil';

import {
	PATH_ROOT,
	PATH_PAGES,
	PATH_PAGE_CREATE,
	PATH_PAGE_EDIT
} from '../constants/PathConstants';

import {
	SESSION_STARTED,
	SESSION_ENDED,
	SESSION_UPDATED,
	ERROR_SHOW
} from '../constants/ActionsConstants';

import * as api from '../api'

export const login = ({username,password}) => {
	return ( dispatch, getState ) => {
		//make api cautiously
		return catchError( dispatch,
			api.login( username, password )
			.then( user => dispatch( sessionStarted( user ) ) )
		);
	};
}

export const logout = () => {
	return ( dispatch, getState ) => {
		//make api cautiously
		return catchError( dispatch,
			api.logout()
			.then( () => dispatch( sessionEnded() ) )
		);
	};
}

export const getStatus = () => {
	return ( dispatch, getState ) => {
		//make api cautiously
		return catchError( dispatch, 
			api.getSession()
			.then( ( user ) => dispatch( sessionUpdated( user ) ) )
		);
	};
}

const sessionStarted = user => ({
	type : SESSION_STARTED,
	user
})

const sessionEnded = () => ({
	type : SESSION_ENDED
})

const sessionUpdated = user => ({
	type : SESSION_UPDATED,
	user
})