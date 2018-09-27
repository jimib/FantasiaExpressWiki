import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames } from '@pixel-inspiration/react-libs/common';
import { hot } from 'react-hot-loader';

import Styles from './css/Stations.styl';

import {JourneyEditor} from '@meyouandus/wikiskin';

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
		var {className,items,itemSelected,onItemSelect,onItemUpdate} = this.props;
		return (<div className={ClassNames(Styles.container,className)}>
			{_.map(items, (item, index) => {
				return <ListItem key={index} data={item} label={item.name || `$${item.id}`} onClick={onItemSelect} />;
			})}
			{itemSelected ? <JourneyEditor stations={[itemSelected.position]} onStationsChange={( stations ) => {
				//console.log('onStationsChange', stations );
				let item = _.clone( itemSelected );
				item.position = _.first( stations );
				onItemUpdate( item );
			}} /> : null}
		</div>)
	}
}

Stations.propTypes = {
	className : PropTypes.string,
	//data : PropTypes.object.isRequired,
	//items : PropTypes.array.isRequired,
	onItemSelect : PropTypes.func.isRequired,
	onItemUpdate : PropTypes.func.isRequired
}

Stations.defaultProps = {
	//onClick : () => console.warn('onClick has not been implemented'),
}

export default hot(module)(Stations);
export {Stations,Styles as StationsStyles};

class ListItem extends Component{
	onClick = ( evt ) => {
		this.props.onClick( this.props.data );
	}
	render(){
		const {className,label} = this.props;
		return (<div className={ClassNames(Styles.item,className)} onClick={this.onClick}>{label}</div>)
	}
}

ListItem.propTypes = {
	className : PropTypes.string,
	label : PropTypes.string.isRequired
}

