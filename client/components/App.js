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
		const { onNavigateTo, location } = this.props;
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
						return <Button key={index} primary={pathname == item.pathname} data={item.pathname} onClick={onNavigateTo}>{item.label}</Button>
					})}
				</Button.Group>
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