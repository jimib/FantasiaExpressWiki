/*eslint-env es6*/
import React, { Component } from 'react';
import { Route, withRouter, Link, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import util from 'util';

import { hot } from 'react-hot-loader';

import Styles from './css/App.styl';

import {Button} from '@pixel-inspiration/react-skin';

import {
	PATH_ROOT,
	PATH_STATIONS,
	PATH_EVENTS,
	PATH_ROUTES
} from '../constants/PathConstants';
import StationsContainer from '../containers/StationsContainer';


class App extends Component {
	componentDidMount(){
		this.props.onMount();
	}
	/**
	 * @memberOf App
	 * @function render
	 * @returns {JSXElement}
	 */
	render() {
		let { users, onLogout, onNavigateTo } = this.props;
		
		return (
			<div className={Styles.container}>
				<ul className={Styles.menu}>
					<li><Button data={PATH_STATIONS} onClick={onNavigateTo}>Stations</Button></li>
					<li><Button data={PATH_EVENTS} onClick={onNavigateTo}>Events</Button></li>
					<li><Button data={PATH_ROUTES} onClick={onNavigateTo}>Routes</Button></li>
				</ul>
				<Switch>
					<Route path={PATH_STATIONS} component={StationsContainer} />
					<Route path={PATH_EVENTS} render={() => {return <h1>Events</h1>}} />
					<Route path={PATH_ROUTES} render={() => {return <h1>Routes</h1>}} />
					
					<Route render={() => <Redirect to={PATH_STATIONS} /> } />
				</Switch>
			</div>
		);
	}
}

App.propTypes = {
	history : PropTypes.object.isRequired
}

const AppWithRouter = withRouter( App );

export default AppWithRouter;

export { AppWithRouter as App, Styles as AppStyles };
