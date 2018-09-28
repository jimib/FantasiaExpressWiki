import { hot } from 'react-hot-loader';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames, getValueFromSources } from '@pixel-inspiration/react-libs/common';

import Styles from './css/Journey.styl';

import {JourneyEditor} from '@meyouandus/wikiskin';
import {Modal,Header,Button,Icon,Form} from 'semantic-ui-react';

const DEFAULT_POSITION = {
	lat: 51.531109166116295,
	lng: -0.125550741249441
}

export default class Journey extends PixelComponent{
	
	/**
	 * @memberOf Journey
	 * @constructs
	 * @param {object} props 
	 */
	constructor(props){
		super(props);
		this.state = {
		}
	}

	componentDidMount(){
		this.props.onMount();
	}
	
	componentWillUnmount(){
		this.props.onUnmount();
	}

	/**
	 * @memberOf Journey
	 * @function onClick
	 * @prop {Journey}
	 * @returns null
	 */
	onClick = (evt) => {
	}

	/**
	 * @memberOf Journey
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {className,stations,events,route,onStationUpdate,onEventUpdate,onRouteUpdate} = this.props;
		console.log( stations );
		return (<div className={ClassNames(Styles.container,className)}>
			{ stations && events && route && <JourneyEditor
				className={Styles.map}
				center={DEFAULT_POSITION}
				changeOnDrag={false}
				stations={stations}
				onStationsChange={(stations, changes) => {
					console.log('stations',changes);
					onStationUpdate( _.first(changes) );
				}}
				events={events} 
				onEventsChange={(events, changes) => {
					console.log('events',changes);
					onEventUpdate( _.first(changes) );
				}}
				points={route?route.points:null}
				onPointsChange={(points, changes) => {
					console.log('points',changes);
					//onRouteUpdate( _.first(changes) );
				}}
			/> }
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
