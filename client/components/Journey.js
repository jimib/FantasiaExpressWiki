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

export default class Journey extends PixelComponent{
	
	/**
	 * @memberOf Journey
	 * @constructs
	 * @param {object} props 
	 */
	constructor(props){
		super(props);
		this.state = {
			speed : 0,
			position : 0
		}
	}

	componentDidMount(){
		this.props.onMount();

		let timeLastUpdate = Date.now();
		this.interval = setInterval( () => {
			let {position,speed} = this.state;
			let timeNow = Date.now();
			position += 100 * speed * (timeNow - timeLastUpdate) / 1000;
			timeLastUpdate = timeNow;

			this.setState({
				position
			});

		}, 1000 );
	}
	
	componentWillUnmount(){
		this.props.onUnmount();
	}

	/**
	 * @memberOf Journey
	 * @function onChange
	 * @prop {Journey}
	 * @returns null
	 */
	onSpeedChange = (evt) => {
		const change = getInputEventChanges( evt );
		this.setState( change );


	}

	/**
	 * @memberOf Journey
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		const {className,stations,events,route,onStationUpdate,onEventUpdate,onRouteUpdate} = this.props;
		const {speed,position} = this.state;
		let train = null;
		let angle = 0;

		if( route ){
			let ipnt;
			let total = 0;

			_.each( route.points, pnt => {
				if( ipnt ){
					if( total < position || total == 0 ){
						//get the distance between 2 points
						const sep = distanceBetweenPnts(pnt,ipnt);
						total += sep;

						if( total >= position ){
							const ratio = 1 - ((total - position) / sep);
							train = {
								lat : ipnt.lat + ratio * (pnt.lat - ipnt.lat),
								lng : ipnt.lng + ratio * (pnt.lng - ipnt.lng)
							}

							angle = angleBetweenPnts( ipnt, pnt );
						}
					}
				}
				ipnt = pnt;
			} )

		}
	
		return (<div className={ClassNames(Styles.container,className)}>

			<input type='range' name='speed' data-type='number' min='-10' max='10' step='0.1' value={speed} onChange={this.onSpeedChange} />
			{ <MapEditor
				className={Styles.map}
				center={DEFAULT_POSITION}>
				<RoutesContainer />
				<StationsContainer />
				<EventsContainer />
			</MapEditor> }

			{false && train && <Compass className={Styles.compass} direction={-angle} />}
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
