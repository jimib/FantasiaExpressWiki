import { connect } from 'react-redux';

import Journey from '../components/Journey';
import { loadEvents, updateEvent } from '../actions/EventsAction';
import { loadRoutes, updateRoute } from '../actions/RoutesAction';
import { loadStations, updateStation } from '../actions/StationsAction';

import _ from 'lodash';

const mapStateToProps = state => {
	return ({
		stations : state.stations.items,
		events : state.events.items,
		route : _.get( state.routes.items, state.routes.indexItemSelected ) || _.first( state.routes.items )
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		dispatch( loadEvents() );
		dispatch( loadStations() );
		dispatch( loadRoutes() );
	},
	onUnmount : () => {
		//dispatch( loadEvents() );
	},
	onRouteUpdate : ( route ) => {
		dispatch( updateRoute( route ) );
	},
	onStationUpdate : ( station ) => {
		dispatch( updateStation( station ) );
	},
	onEventUpdate : ( event ) => {
		dispatch( updateEvent( event ) );
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	Journey
);
