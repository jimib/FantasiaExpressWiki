
import produce from 'immer';
import util from 'util';

import {
	ERROR_SHOW, ERROR_HIDE
} from '../constants/ActionsConstants';

import {
	UpdateProperty
} from '../utils/ReducerUtil';

const reducer = (state = {message:null}, action) => {
	if( util.isNullOrUndefined( action.type )  ){
		throw new Error('Undefined action type received');
	}
	return produce( state, state => {
		switch (action.type) {
			case ERROR_SHOW:
				const {error} = action;
				return UpdateProperty( state, 'message', error.message || error );
				break;
			case ERROR_HIDE:
				return UpdateProperty( state, 'message', null );
				break;
		}
	} );
	//return state
}

export default reducer;