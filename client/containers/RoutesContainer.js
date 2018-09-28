import { connect } from 'react-redux';

import Routes from '../components/Routes';
import { loadRoutes, selectRoute, updateRoute, unselectRoute, removeRoute, addRoute } from '../actions/RoutesAction';
import { loadStations } from '../actions/StationsAction';


const mapStateToProps = state => {
	return ({
		stations : state.stations.items,
		items : state.routes.items,
		itemSelected : _.get( state.routes.items, state.routes.indexItemSelected ) || _.first( state.routes.items )
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		dispatch( loadRoutes() );
		dispatch( loadStations() );
	},
	onUnmount : () => {
		//dispatch( loadRoutes() );
	},
	onItemSelect : ( station ) => {
		dispatch( selectRoute( station ) );
	},
	onItemUnselect : ( ) => {
		dispatch( unselectRoute( ) );
	},
	onItemUpdate : ( station ) => {
		dispatch( updateRoute( station ) );
	},
	onItemRemove : ( station ) => {
		dispatch( removeRoute( station ) );
	},
	onItemCreate : () => {
		dispatch( addRoute( {
			name:'New Route',
			position: {
				lat: 51.531109166116295,
				lng: -0.125550741249441
			}
		} ) );
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	Routes
);
