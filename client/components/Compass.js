import React from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames } from '@pixel-inspiration/react-libs/common';
import { hot } from 'react-hot-loader';

import Styles from './css/Compass.styl';

class Compass extends PixelComponent{
	
	/**
	 * @memberOf Compass
	 * @constructs
	 * @param {object} props 
	 */
	constructor(props){
		super(props);
		this.state = {
		}
	}

	/**
	 * @memberOf Compass
	 * @function onClick
	 * @prop {Event}
	 * @returns null
	 */
	onClick = (evt) => {
	}

	/**
	 * @memberOf Compass
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {className,direction = 0} = this.props;
		return (<div className={ClassNames(Styles.container,className)}>
			<div className={Styles.content} 
				style={{transform:`rotate(${direction}deg)`}}
			/>
		</div>)
	}
}

Compass.propTypes = {
	className : PropTypes.string,
	rotation : PropTypes.number
	//items : PropTypes.array.isRequired,
	//onClick : PropTypes.func.isRequired
}

Compass.defaultProps = {
	rotation : 0
}

export default hot(module)(Compass);
export {Compass,Styles as CompassStyles};
