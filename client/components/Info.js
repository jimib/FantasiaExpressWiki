/*eslint-env es6*/
import React, { Component } from 'react';

import { hot } from 'react-hot-loader';

import Styles from './css/Info.styl';

import {Button} from '@pixel-inspiration/react-skin';

const Info = ( props ) => {
	const {children} = props;
	return <div className={Styles.container}>
		{children}
	</div>
}

export default hot(module)(Info);

export { Info, Styles as InfoStyles };
