import {
	ERROR_SHOW,ERROR_HIDE
} from '../constants/ActionsConstants';

export const showError = ( error ) => ({
	type : ERROR_SHOW,
	error
})

export const hideError = ( ) => ({
	type : ERROR_HIDE
})

//wrapper that will bind to any promise and auto handle any error produced
export const catchError = (dispatch, promise) =>  {
	return promise.catch( err => {
		console.log('Catch', err);
		dispatch( showError( err ) )
	});
}