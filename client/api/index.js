import { apiGet, apiPost, apiPut, apiDelete } from '../utils/ApiUtil';
import {createRoutePath} from '../utils/PathUtil';

import {
	URL_API,
	URL_API_USERS,
	URL_API_USER,
	URL_AUTH_SESSION,
	URL_AUTH_LOGIN, 
	URL_AUTH_LOGOUT
} from '../constants/ApiConstants';

export function addUser( user ){
	return apiPost( `${URL_API_USERS}`, user );
}

export function updateUser( user ){
	return apiPut( createRoutePath( `${URL_API_USER}`, user ), user );
}

export function deleteUser( user ){
	return apiDelete( createRoutePath( `${URL_API_USER}`, user ), user );
}

export function getUsers(){
	return apiGet( `${URL_API_USERS}` );
}

export function getUserById( id ){
	return apiGet( createRoutePath( `${URL_API_USER}`, {id} ) );
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