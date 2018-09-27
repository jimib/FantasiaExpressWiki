import { connect } from 'react-redux';

import Stations from '../components/Stations';
import { loadStations, selectStation } from '../actions/StationsAction';


const mapStateToProps = state => {
	return ({
		items : state.stations.items,
		itemSelected : state.stations.itemSelected
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		//dispatch( loadStations() );
	},
	onItemSelect : ( station ) => {
		dispatch( selectStation( station ) );
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	Stations
);
