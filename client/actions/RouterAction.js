import { push, replace, goBack } from 'connected-react-router';

import {showError,catchError} from './ErrorAction';
import {createRoutePath} from '../utils/PathUtil';

export const navigateTo = ( path ) => {
	return ( dispatch, getState ) => {
		dispatch( push( path ) );
	}; 
}