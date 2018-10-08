import { hot } from 'react-hot-loader';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames, getValueFromSources, getInputEventChanges } from '@pixel-inspiration/react-libs/common';

import Styles from './css/Journey.styl';

import {MapEditor} from '@meyouandus/wikiskin';
import {Modal,Header,Button,Icon,Form} from 'semantic-ui-react';

import {distanceBetweenPnts, angleBetweenPnts} from '../utils/GeoUtil';
import Compass from './Compass';
import StationsContainer from '../containers/StationsContainer';
import EventsContainer from '../containers/EventsContainer';
import RoutesContainer from '../containers/RoutesContainer';

const DEFAULT_POSITION = {
	lat: 51.531109166116295,
	lng: -0.125550741249441
}

const MENU_ITEM_STATIONS = 'Stations';
const MENU_ITEM_EVENTS = 'Events';
const MENU_ITEM_ROUTE = 'Route';
const MENU_ITEMS = [
	MENU_ITEM_EVENTS,
	MENU_ITEM_ROUTE,
	MENU_ITEM_STATIONS,
]

export default class Journey extends PixelComponent{
	state = {
		itemSelected : null
	}
	
	componentWillUnmount(){
		this.props.onUnmount();
	}
	
	componentDidMount(){
		this.props.onMount();
	}

	onItemSelected = ( evt, btn ) => {
		//console.log( btn.data );
		this.setState({
			itemSelected : btn.data
		});
	}

	/**
	 * @memberOf Journey
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		const {className} = this.props;
		let {itemSelected} = this.state;
		
		itemSelected = itemSelected || _.first(MENU_ITEMS);

		return (<div className={ClassNames(Styles.container,className)}>

			{ <MapEditor
				className={Styles.map}
				center={DEFAULT_POSITION}>
				<RoutesContainer disabled={itemSelected != MENU_ITEM_ROUTE} />
				<StationsContainer disabled={itemSelected != MENU_ITEM_STATIONS} />
				<EventsContainer disabled={itemSelected != MENU_ITEM_EVENTS} />
			</MapEditor> }

			<Button.Group className={Styles.controls}>
				{_.map(MENU_ITEMS, (item, index) => {
					return <Button key={index} primary={itemSelected == item} data={item} onClick={this.onItemSelected}>{item}</Button>
				})}
			</Button.Group>
		</div>)
	}
}

Journey.propTypes = {
	className : PropTypes.string,
	//data : PropTypes.object.isRequired,
	//items : PropTypes.array.isRequired,
}

Journey.defaultProps = {
	//onClick : () => console.warn('onClick has not been implemented'),
}
