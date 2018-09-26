
import produce from 'immer';
import util from 'util';

import {
	USER_ADDED,
	USER_REMOVED,
	USER_UPDATED,
	USERS_LOAD_BEGIN,
	USERS_LOAD_SUCCESS,
	USERS_LOAD_FAIL
} from '../constants/ActionsConstants';

import {
	UpdateItem,
	RemoveItem,
	AddItem,
	Update
} from '../utils/ReducerUtil';

const INITIAL_STATE = {
	items : [],
	error : null,
	loading : false
}

const reducer = (state = INITIAL_STATE, action) => {
	if( util.isNullOrUndefined( action.type )  ){
		throw new Error('Undefined action type received');
	}
	return produce( state, state => {
		switch (action.type) {
			case USER_ADDED:
				return AddItem( state.items, action.user );
				break;
			case USER_REMOVED:
				return RemoveItem( state.items, action.user );
				break;
			case USER_UPDATED:
				return UpdateItem( state.items, action.user );
				break;
			case USERS_LOAD_BEGIN:
				return Update( state, {
					error : null,
					loading : true
				} );
				break;
			case USERS_LOAD_SUCCESS:
				return Update( state, {
					items : action.users,
					error : null,
					loading : false
				} );
				break;
			case USERS_LOAD_FAIL:
				return Update( state, {
					items : [],
					error : action.error,
					loading : false
				} );
				break;
			break;
		}
	} );
	//return state
}

export default reducer;