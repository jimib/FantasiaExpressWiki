import { connect } from 'react-redux';

import Stations from '../components/Stations';
import { loadStations, selectStation, updateStation, unselectStation, removeStation } from '../actions/StationsAction';


const mapStateToProps = state => {
	return ({
		items : state.stations.items,
		itemSelected : _.get( state.stations.items, state.stations.indexItemSelected )
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		//dispatch( loadStations() );
	},
	onItemSelect : ( station ) => {
		dispatch( selectStation( station ) );
	},
	onItemUnselect : ( ) => {
		dispatch( unselectStation( ) );
	},
	onItemUpdate : ( station ) => {
		dispatch( updateStation( station ) );
	},
	onItemRemove : ( station ) => {
		dispatch( removeStation( station ) );
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	Stations
);
