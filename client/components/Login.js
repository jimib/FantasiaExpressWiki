import React from 'react';
import { hot } from 'react-hot-loader';

import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames, getEventTargetAttrs } from '@pixel-inspiration/react-libs/common';

import {Button} from '@pixel-inspiration/react-skin';

import { validateEmail } from '../utils/ValidationUtil';

import Styles from './css/Login.styl';
import $ from 'jquery';

class Login extends PixelComponent {
	state = {
		username : '',
		password : ''
	}

	onChange = ( evt ) => {
		const {name} = getEventTargetAttrs( evt, 'name' );
		const value = $( evt.currentTarget ).val();

		this.setState({
			[name] : value
		})
	}

	onSubmit = () => {
		console.log('onSubmit', this.state );
		this.props.onLogin( this.state );
	}
	/**
	 * @memberOf Login
	 * @function render
	 * @returns {JSXElement}
	 */
	render() {
		const {username,password} = this.state;
		return <div className={Styles.container}>
			<p>u: admin</p>
			<p>p: admin</p>
			<input name='username' type='text' value={username} onChange={this.onChange} />
			<input name='password' type='password' value={password} onChange={this.onChange} />
			<Button className={Styles.submit} onClick={this.onSubmit}>Submit</Button>
		</div>
	}
}

export default hot(module)(Login);
export { Login, Styles as LoginStyles };
