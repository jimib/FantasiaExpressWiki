import React from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames } from '@pixel-inspiration/react-libs/common';
import { hot } from 'react-hot-loader';

import Styles from './css/Stations.styl';

class Stations extends PixelComponent{
	
	/**
	 * @memberOf Stations
	 * @constructs
	 * @param {object} props 
	 */
	constructor(props){
		super(props);
		this.state = {
		}
	}

	/**
	 * @memberOf Stations
	 * @function onClick
	 * @prop {Event}
	 * @returns null
	 */
	onClick = (evt) => {
	}

	/**
	 * @memberOf Stations
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {className,items} = this.props;
		return (<div className={ClassNames(Styles.container,className)}>
			{_.map(items, item => {
				return <li>{item.id}</li>
			})}
		</div>)
	}
}

Stations.propTypes = {
	className : PropTypes.string,
	//data : PropTypes.object.isRequired,
	//items : PropTypes.array.isRequired,
	//onClick : PropTypes.func.isRequired
}

Stations.defaultProps = {
	//onClick : () => console.warn('onClick has not been implemented'),
}

export default hot(module)(Stations);
export {Stations,Styles as StationsStyles};
