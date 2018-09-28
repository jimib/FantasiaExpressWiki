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
		console.log( pathname );
		return (
			<div className={Styles.container}>
				<Button.Group>
					{_.map([
						{label:'Station',pathname:PATH_STATIONS},
						{label:'Events',pathname:PATH_EVENTS},
						{label:'Routes',pathname:PATH_ROUTES}
					], (item, index) => {
						return <Button key={index} primary={pathname == item.pathname} data={item.pathname} onClick={this.onNavigateTo}>{item.label}</Button>
					})}
				</Button.Group>
				<Switch>
					<Route path={PATH_STATIONS} component={StationsContainer} />
					<Route path={PATH_EVENTS} component={EventsContainer} />
					<Route path={PATH_ROUTES} component={RoutesContainer} />
					
					<Route render={() => <Redirect to={PATH_STATIONS} /> } />
				</Switch>
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
