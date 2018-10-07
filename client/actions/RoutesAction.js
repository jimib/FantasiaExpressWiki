
import { push } from 'connected-react-router';

import * as api from '../api';

import {showError, catchError} from './ErrorAction';
import {createRoutePath} from '../utils/PathUtil';

import {
	PATH_ROOT
} from '../constants/PathConstants';

import {
	ROUTE_ADDED,
	ROUTE_UPDATED,
	ROUTE_REMOVED,
	ROUTE_SELECTED,
	ERROR_SHOW,
	ROUTES_LOAD_BEGIN,
	ROUTES_LOAD_FAIL,
	ROUTES_LOAD_SUCCESS
} from '../constants/ActionsConstants';

export const addRoute = route => {
	return ( dispatch, getState ) => {
		return api.addRoute( route )
		.then(( route ) => {
			return dispatch( routeAdded( route ) );
		});
	};
}

export const removeRoute = route => {
	return ( dispatch, getState ) => {
		return api.deleteRoute( route )
		.then( () => {
			return dispatch( routeRemoved( route ) );
		} );
	};
}

export const updateRoute = route => {
	return ( dispatch, getState ) => {
		dispatch( routeUpdated( route ) );
		return api.updateRoute( route )
		.then( () => {
			return dispatch( routeUpdated( route ) );
		} );
	};
}

export const loadRoutes = () => {
	return ( dispatch, getState ) => {
		//notify that we're loading
		dispatch( routesLoadBegin() );
		//make the request
		api.getRoutes()
		.then( routes => dispatch( routesLoadSuccess( routes ) ) )
		.catch( err => {
			//handle the error
			dispatch( routesLoadFail( err ) );
			dispatch( showError( err ) );
		})
	};
}

export const selectRoute = ( route ) => {
	return routeSelected( route );
}

export const unselectRoute = () => {
	return routeSelected( null );
}


const routeAdded = route => ({
	type : ROUTE_ADDED,
	route
});

const routeUpdated = route => ({
	type : ROUTE_UPDATED,
	route
});

const routeRemoved = route => ({
	type : ROUTE_REMOVED,
	route
});

const routeSelected = route => ({
	type : ROUTE_SELECTED,
	route
});

const routesLoadBegin = () => ({
	type : ROUTES_LOAD_BEGIN
});

const routesLoadSuccess = routes => ({
	type : ROUTES_LOAD_SUCCESS,
	routes
});

const routesLoadFail = error => ({
	type : ROUTES_LOAD_FAIL,
	error
});