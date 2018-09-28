
import produce from 'immer';
import util from 'util';

import {
	EVENT_ADDED,
	EVENT_REMOVED,
	EVENT_UPDATED,
	EVENT_SELECTED,
	EVENTS_LOAD_BEGIN,
	EVENTS_LOAD_SUCCESS,
	EVENTS_LOAD_FAIL
} from '../constants/ActionsConstants';

import {
	UpdateItem,
	RemoveItem,
	AddItem,
	Update,
	GetItemReference
} from '../utils/ReducerUtil';

const INITIAL_STATE = {
	items : [],
	indexItemSelected : -1,
	error : null,
	loading : false
}

const reducer = (state = INITIAL_STATE, action) => {
	if( util.isNullOrUndefined( action.type )  ){
		throw new Error('Undefined action type received');
	}
	return produce( state, state => {
		switch (action.type) {
			case EVENT_ADDED:
				state.items = AddItem( state.items, action.event );
				return state;
				break;
			case EVENT_REMOVED:
				state.items = RemoveItem( state.items, action.event );
				return state;
				break;
			case EVENT_UPDATED:
				state.items = UpdateItem( state.items, action.event );
				return state;
				break;
			case EVENT_SELECTED:
				state.indexItemSelected = action.event ? _.indexOf( state.items, GetItemReference( state.items, action.event ) ) : -1;
				return state;
				break;
			case EVENTS_LOAD_BEGIN:
				return Update( state, {
					error : null,
					loading : true
				} );
				break;
			case EVENTS_LOAD_SUCCESS:
				return Update( state, {
					items : action.events,
					error : null,
					loading : false
				} );
				break;
			case EVENTS_LOAD_FAIL:
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