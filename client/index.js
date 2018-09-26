import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';

import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

const withDevTools = (
	// process.env.NODE_ENV === 'development' &&
	typeof window !== 'undefined' && window.devToolsExtension
);

import { createHashHistory } from 'history';
import { compose, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';

import thunk from 'redux-thunk';
import rootReducer from './reducers';


const history = createHashHistory({
	hashType: 'slash',
	getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

window.goTo = path => history.push( path );
window.goBack = path => history.goBack();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( 
	connectRouter( history )( rootReducer ),  
	composeEnhancers(
		applyMiddleware(
			routerMiddleware( history ),
			thunk 
		)
	)
);

//this is important even though it's not used - no idea why!!!
import * as HotLoader from 'react-hot-loader';
import $ from 'jquery';


//onload attach the react app
$( () => {
	var $root = $('<div>').attr('data-app','app').appendTo( $('body') );
	ReactDOM.render( 
		<Provider store={store}>
			<AppContainer enableLogin={false} />
		</Provider>, 
	$root.get(0) );
} );


