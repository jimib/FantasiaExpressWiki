
import produce from 'immer';
import util from 'util';

import {
	SESSION_STARTED,
	SESSION_ENDED,
	SESSION_UPDATED
} from '../constants/ActionsConstants';

import {
	UpdateProperty
} from '../utils/ReducerUtil';

const reducer = (state = {user:null}, action) => {
	if( util.isNullOrUndefined( action.type )  ){
		throw new Error('Undefined action type received');
	}
	return produce( state, state => {
		switch (action.type) {
			case SESSION_STARTED:
			case SESSION_UPDATED:
				return UpdateProperty( state, 'user', action.user );
				break;
			case SESSION_ENDED:
				return UpdateProperty( state, 'user', null );
				break;
		}
	} );
	//return state
}

export default reducer;