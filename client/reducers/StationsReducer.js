
import produce from 'immer';
import util from 'util';

import {
	STATION_ADDED,
	STATION_REMOVED,
	STATION_UPDATED,
	STATIONS_LOAD_BEGIN,
	STATIONS_LOAD_SUCCESS,
	STATIONS_LOAD_FAIL
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
			case STATION_ADDED:
				return AddItem( state.items, action.station );
				break;
			case STATION_REMOVED:
				return RemoveItem( state.items, action.station );
				break;
			case STATION_UPDATED:
				return UpdateItem( state.items, action.station );
				break;
			case STATIONS_LOAD_BEGIN:
				return Update( state, {
					error : null,
					loading : true
				} );
				break;
			case STATIONS_LOAD_SUCCESS:
				return Update( state, {
					items : action.stations,
					error : null,
					loading : false
				} );
				break;
			case STATIONS_LOAD_FAIL:
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