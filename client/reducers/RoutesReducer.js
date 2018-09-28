
import produce from 'immer';
import util from 'util';

import {
	ROUTE_ADDED,
	ROUTE_REMOVED,
	ROUTE_UPDATED,
	ROUTE_SELECTED,
	ROUTES_LOAD_BEGIN,
	ROUTES_LOAD_SUCCESS,
	ROUTES_LOAD_FAIL
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
			case ROUTE_ADDED:
				state.items = AddItem( state.items, action.route );
				return state;
				break;
			case ROUTE_REMOVED:
				state.items = RemoveItem( state.items, action.route );
				return state;
				break;
			case ROUTE_UPDATED:
				state.items = UpdateItem( state.items, action.route );
				return state;
				break;
			case ROUTE_SELECTED:
				state.indexItemSelected = action.route ? _.indexOf( state.items, GetItemReference( state.items, action.route ) ) : -1;
				return state;
				break;
			case ROUTES_LOAD_BEGIN:
				return Update( state, {
					error : null,
					loading : true
				} );
				break;
			case ROUTES_LOAD_SUCCESS:
				return Update( state, {
					items : action.routes,
					error : null,
					loading : false
				} );
				break;
			case ROUTES_LOAD_FAIL:
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