
import { push } from 'connected-react-router';

import * as api from '../api';

import {showError, catchError} from './ErrorAction';
import {createRoutePath} from '../utils/PathUtil';

import {
	PATH_ROOT
} from '../constants/PathConstants';

import {
	STATION_ADDED,
	STATION_UPDATED,
	STATION_REMOVED,
	STATION_SELECTED,
	ERROR_SHOW,
	STATIONS_LOAD_BEGIN,
	STATIONS_LOAD_FAIL,
	STATIONS_LOAD_SUCCESS
} from '../constants/ActionsConstants';

export const addStation = station => {
	return ( dispatch, getState ) => {
		return api.addStation( station )
		.then(( station ) => {
			return dispatch( stationAdded( station ) );
		});
	};
}

export const removeStation = station => {
	return ( dispatch, getState ) => {
		return api.deleteStation( station )
		.then( () => {
			return dispatch( stationRemoved( station ) );
		} );
	};
}

export const updateStation = station => {
	return ( dispatch, getState ) => {
		dispatch( stationUpdated( station ) );
		return api.updateStation( station )
		.then( () => {
			return dispatch( stationUpdated( station ) );
		} );
	};
}

export const loadStations = () => {
	return ( dispatch, getState ) => {
		//notify that we're loading
		dispatch( stationsLoadBegin() );
		//make the request
		api.getStations()
		.then( stations => dispatch( stationsLoadSuccess( stations ) ) )
		.catch( err => {
			//handle the error
			dispatch( stationsLoadFail( err ) );
			dispatch( showError( err ) );
		})
	};
}

export const selectStation = ( station ) => {
	return stationSelected( station );
}

export const unselectStation = () => {
	return stationSelected( null );
}


const stationAdded = station => ({
	type : STATION_ADDED,
	station
});

const stationUpdated = station => ({
	type : STATION_UPDATED,
	station
});

const stationRemoved = station => ({
	type : STATION_REMOVED,
	station
});

const stationSelected = station => ({
	type : STATION_SELECTED,
	station
});

const stationsLoadBegin = () => ({
	type : STATIONS_LOAD_BEGIN
});

const stationsLoadSuccess = stations => ({
	type : STATIONS_LOAD_SUCCESS,
	stations
});

const stationsLoadFail = error => ({
	type : STATIONS_LOAD_FAIL,
	error
});