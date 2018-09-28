import { get, post, put, del, apiGet, apiPost } from '@pixel-inspiration/react-libs/common';
import {createRoutePath} from '../utils/PathUtil';

import {
	URL_API,
	URL_API_STATION,
	URL_API_STATIONS,
	URL_API_EVENT,
	URL_API_EVENTS,
	URL_API_ROUTE,
	URL_API_ROUTES,
	URL_AUTH_SESSION,
	URL_AUTH_LOGIN, 
	URL_AUTH_LOGOUT
} from '../constants/ApiConstants';

export function getStations( station ){
	return get( `${URL_API_STATIONS}`, station );
}

export function addStation( station ){
	return post( `${URL_API_STATIONS}`, station );
}

export function updateStation( station ){
	return put( createRoutePath( `${URL_API_STATION}`, station ), station );
}

export function deleteStation( station ){
	return del( createRoutePath( `${URL_API_STATION}`, station ), station );
}

export function getEvents( event ){
	return get( `${URL_API_EVENTS}`, event );
}

export function addEvent( event ){
	return post( `${URL_API_EVENTS}`, event );
}

export function updateEvent( event ){
	return put( createRoutePath( `${URL_API_EVENT}`, event ), event );
}

export function deleteEvent( event ){
	return del( createRoutePath( `${URL_API_EVENT}`, event ), event );
}

export function getRoutes( ){
	return get( `${URL_API_ROUTES}` );
}

export function addRoute( route ){
	return post( `${URL_API_ROUTES}`, route );
}

export function updateRoute( route ){
	return put( createRoutePath( `${URL_API_ROUTE}`, route ), route );
}

export function deleteRoute( route ){
	return del( createRoutePath( `${URL_API_ROUTE}`, route ), route );
}

export function getSession(){
	return apiGet( createRoutePath( URL_AUTH_SESSION ) )
}

export function login( username, password ){
	return apiPost( createRoutePath( URL_AUTH_LOGIN ), {username,password} )
}

export function logout( ){
	return apiPost( createRoutePath( URL_AUTH_LOGOUT ) )
}