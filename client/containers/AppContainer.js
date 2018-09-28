import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';


import {
	login,
	logout,
	getStatus
} from '../actions/SessionAction';

import {
	navigateTo
} from '../actions/RouterAction';

import App from '../components/App';
import Login from '../components/Login';
import { hideError } from '../actions/ErrorAction';
import { loadStations } from '../actions/StationsAction';

class AppContainer extends Component{

	componentDidMount(){
		if( this.props.enableLogin ){
			this.props.updateStatus();
			this.interval = setInterval( () => {
				this.props.updateStatus();
			}, 10000 );
		}
	}

	componentWillUnmount(){
		clearInterval( this.interval );
	}

	render(){
		const {
			error,onErrorDismiss,
			user,onLogin,onLogout,enableLogin,
			onNavigateTo
		} = this.props;
		return (
		<Router>
			<div>
				{/*DISPLAY ERROR MESSAGE*/}
				{error ? <ErrorMessage error={error} onClose={onErrorDismiss} /> : null }

				{/*IF ENABLE_LOGIN IF ENABLED AND NO USER DETECTED*/}
				{/*ELSE DISPLAY APP*/}
				{ (enableLogin && !user) ? 
					<Login onLogin={onLogin} /> : 
					<App {...this.props} /> }
			</div>
		</Router>
		);
	}
} 

AppContainer.propTypes = {
	updateStatus : PropTypes.func.isRequired,
	enableLogin : PropTypes.bool.isRequired,
	onLogin : PropTypes.func,
	onLogout : PropTypes.func,
	error : PropTypes.string,
	onErrorDismiss : PropTypes.func.isRequired,
	onNavigateTo : PropTypes.func.isRequired
}

const ErrorMessage = ( props ) => {
	const {error,onClose} = props;
	return <div>
		<p>{error} - <button onClick={onClose}>Dismiss</button></p>
	</div>
}

const mapStateToProps = state => {
	return ({
		error : state.error.message,
		user : state.session.user
	});
}

const mapDispatchToProps = dispatch => ({
	onMount : () => {
		dispatch( loadStations() );
	},
	updateStatus : () => dispatch( getStatus() ),
	onLogin : ( username, password ) => dispatch( login(username, password) ),
	onLogout : () => dispatch( logout() ),
	onErrorDismiss : () => dispatch( hideError() ),
	onNavigateTo : ( path ) => {
		dispatch( navigateTo( path ) )
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( 
	AppContainer
);
