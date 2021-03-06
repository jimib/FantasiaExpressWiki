/*eslint-env es6*/
import React, { Component } from 'react';
import { Route, withRouter, Link, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import util from 'util';

import { hot } from 'react-hot-loader';

import Styles from './css/App.styl';

import {Button} from 'semantic-ui-react';

import {
	PATH_ROOT,
	PATH_STATIONS,
	PATH_EVENTS,
	PATH_ROUTES
} from '../constants/PathConstants';

import StationsContainer from '../containers/StationsContainer';
import RoutesContainer from '../containers/RoutesContainer';
import EventsContainer from '../containers/EventsContainer';
import JourneyContainer from '../containers/JourneyContainer';


class App extends Component {

	onNavigateTo = ( evt, btn ) => {
		this.props.onNavigateTo( btn.data );
	}
	/**
	 * @memberOf App
	 * @function render
	 * @returns {JSXElement}
	 */
	render() {
		const { location } = this.props;
		const {pathname} = location || {};
		
		return (
			<div className={Styles.container}>
				<JourneyContainer className={Styles.map} />
			</div>
		);
	}
}

App.propTypes = {
	location : PropTypes.object.isRequired
}

const AppWithRouter = withRouter( App );

export default AppWithRouter;

export { AppWithRouter as App, Styles as AppStyles };
