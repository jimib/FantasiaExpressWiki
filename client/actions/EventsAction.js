
import { push } from 'connected-react-router';

import * as api from '../api';

import {showError, catchError} from './ErrorAction';
import {createRoutePath} from '../utils/PathUtil';

import {
	PATH_ROOT
} from '../constants/PathConstants';

import {
	EVENT_ADDED,
	EVENT_UPDATED,
	EVENT_REMOVED,
	EVENT_SELECTED,
	ERROR_SHOW,
	EVENTS_LOAD_BEGIN,
	EVENTS_LOAD_FAIL,
	EVENTS_LOAD_SUCCESS
} from '../constants/ActionsConstants';

export const addEvent = event => {
	return ( dispatch, getState ) => {
		return api.addEvent( event )
		.then(( event ) => {
			return dispatch( eventAdded( event ) );
		});
	};
}

export const removeEvent = event => {
	return ( dispatch, getState ) => {
		return api.deleteEvent( event )
		.then( () => {
			return dispatch( eventRemoved( event ) );
		} );
	};
}

export const updateEvent = event => {
	return ( dispatch, getState ) => {
		dispatch( eventUpdated( event ) );
		return api.updateEvent( event )
		.then( () => {
			return dispatch( eventUpdated( event ) );
		} );
	};
}

export const loadEvents = () => {
	return ( dispatch, getState ) => {
		//notify that we're loading
		dispatch( eventsLoadBegin() );
		//make the request
		api.getEvents()
		.then( events => dispatch( eventsLoadSuccess( events ) ) )
		.catch( err => {
			//handle the error
			dispatch( eventsLoadFail( err ) );
			dispatch( showError( err ) );
		})
	};
}

export const selectEvent = ( event ) => {
	return eventSelected( event );
}

export const unselectEvent = () => {
	return eventSelected( null );
}


const eventAdded = event => ({
	type : EVENT_ADDED,
	event
});

const eventUpdated = event => ({
	type : EVENT_UPDATED,
	event
});

const eventRemoved = event => ({
	type : EVENT_REMOVED,
	event
});

const eventSelected = event => ({
	type : EVENT_SELECTED,
	event
});

const eventsLoadBegin = () => ({
	type : EVENTS_LOAD_BEGIN
});

const eventsLoadSuccess = events => ({
	type : EVENTS_LOAD_SUCCESS,
	events
});

const eventsLoadFail = error => ({
	type : EVENTS_LOAD_FAIL,
	error
});