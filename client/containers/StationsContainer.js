import { connect } from 'react-redux';

import Stations from '../components/Stations';
import { loadStations, selectStation, updateStation } from '../actions/StationsAction';


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
	onItemUpdate : ( station ) => {
		dispatch( updateStation( station ) );
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	Stations
);
