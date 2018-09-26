import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames, getEventTargetAttrs } from '@pixel-inspiration/react-libs/common';

import {Button} from '@pixel-inspiration/react-skin';

import { validateEmail } from '../utils/ValidationUtil';

import Styles from './css/Users.styl';
import $ from 'jquery';
import { util } from 'node-forge';

class Users extends PixelComponent {
	componentDidMount(){
		//request the information the component needs
		this.props.loadData();
	}

	/**
	 * @memberOf Users
	 * @function render
	 * @returns {JSXElement}
	 */
	render() {
		const {users} = this.props;
		return <div className={Styles.container}>
			<ul>
				{ util.isArray( users ) && users.length > 0 ? 
					_.map( users, (user, index) => {
						return <li key={index}>{user.firstname} {user.lastname}</li>
					} ) :
					<p>No users found</p>
				}
			</ul>
		</div>
	}
}

Users.propTypes = {
	users : PropTypes.array.isRequired,
	loadData : PropTypes.func.isRequired,
	addUser : PropTypes.func.isRequired,
	updateUser : PropTypes.func.isRequired,
	removeUser : PropTypes.func.isRequired,
}

export default hot(module)(Users);
export { Users, Styles as UsersStyles };
