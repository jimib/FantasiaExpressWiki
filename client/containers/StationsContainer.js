import { connect } from 'react-redux';

import Stations from '../components/Stations';
import { loadStations } from '../actions/StationsAction';


const mapStateToProps = state => {
	return ({
		items : state.stations.items
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		//dispatch( loadStations() );
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	Stations
);
