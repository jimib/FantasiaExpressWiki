import { connect } from 'react-redux';

import Events from '../components/Events';
import { loadEvents, selectEvent, updateEvent, unselectEvent, removeEvent, addEvent } from '../actions/EventsAction';


const mapStateToProps = state => {
	return ({
		items : state.events.items,
		itemSelected : _.get( state.events.items, state.events.indexItemSelected ) ||  _.first( state.events.items )
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		dispatch( loadEvents() );
	},
	onUnmount : () => {
		//dispatch( loadEvents() );
	},
	onItemSelect : ( event ) => {
		dispatch( selectEvent( event ) );
	},
	onItemUnselect : ( ) => {
		dispatch( unselectEvent( ) );
	},
	onItemUpdate : ( event ) => {
		dispatch( updateEvent( event ) );
	},
	onItemRemove : ( event ) => {
		dispatch( removeEvent( event ) );
	},
	onItemCreate : () => {
		dispatch( addEvent( {
			name:'New Event',
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
	Events
);
