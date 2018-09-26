/*eslint-env es6*/
import React, { Component } from 'react';
import { Route, withRouter, Link, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import util from 'util';

import { hot } from 'react-hot-loader';

import Styles from './css/App.styl';

import {Button} from '@pixel-inspiration/react-skin';

import UsersContainer from '../containers/UsersContainer';
import Info from './Info';

import {
	PATH_ROOT,
	PATH_USERS,
	PATH_INFO
} from '../constants/PathConstants';
import { getEventTargetAttrs } from '../../node_modules/@pixel-inspiration/react-libs/common';

class App extends Component {
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
					<li><Button data={PATH_USERS} onClick={onNavigateTo}>Users</Button></li>
					<li><Button data={PATH_INFO} onClick={onNavigateTo}>Info</Button></li>
					{util.isFunction(onLogout) && <li className={Styles.right}><Button onClick={onLogout}>Logout</Button></li>}
				</ul>
				<Switch>
					<Route path={PATH_USERS} component={UsersContainer} />
					<Route path={PATH_INFO} render={() => (<Info>
						This is some basic information I want to display without a container
					</Info>)} />
					<Route render={() => <Redirect to={PATH_USERS} /> } />
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
