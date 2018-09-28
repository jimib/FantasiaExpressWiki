import React, {Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames, getValueFromSources } from '@pixel-inspiration/react-libs/common';
import { hot } from 'react-hot-loader';

import Styles from './css/Routes.styl';

import {JourneyEditor} from '@meyouandus/wikiskin';
import {Modal,Header,Button,Icon,Form} from 'semantic-ui-react';

class Routes extends PixelComponent{
	
	/**
	 * @memberOf Routes
	 * @constructs
	 * @param {object} props 
	 */
	constructor(props){
		super(props);
		this.state = {
		}
	}

	
	componentDidMount(){
		this.props.onMount();
	}
	
	componentWillUnmount(){
		this.props.onUnmount();
	}

	/**
	 * @memberOf Routes
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {className,stations,items,itemSelected,onItemSelect,onItemUnselect,onItemUpdate,onItemRemove,onItemCreate} = this.props;
		return (<div className={ClassNames(Styles.container,className)}>
			<h1>Routes</h1>
			<div className={Styles.content}>
				<div className={Styles.list}>
					{_.map(items, (item, index) => {
						return <ListItem 
									key={index} 
									data={item} 
									label={item.name || `$${item.id}`} 
									onEdit={onItemSelect} 
									onDelete={onItemRemove} />;
					})}
				</div>
				<Button floated='right' icon='add' content='Route' onClick={onItemCreate} />
			</div>

			{itemSelected ? <EditItem data={itemSelected} stations={stations} onClose={onItemUnselect} onSave={onItemUpdate} /> : null}
		</div>)
	}
}

Routes.propTypes = {
	className : PropTypes.string,
	//data : PropTypes.object.isRequired,
	//items : PropTypes.array.isRequired,
	onItemSelect : PropTypes.func.isRequired,
	onItemUpdate : PropTypes.func.isRequired,
	onItemRemove : PropTypes.func.isRequired
}

Routes.defaultProps = {
	//onClick : () => console.warn('onClick has not been implemented'),
}

export default hot(module)(Routes);
export {Routes,Styles as RoutesStyles};

class ListItem extends Component{
	onEdit = ( evt ) => {
		this.props.onEdit( this.props.data );
	}
	
	onDelete = ( evt ) => {
		this.props.onDelete( this.props.data );
	}

	render(){
		const {className,label} = this.props;
		return (<div className={ClassNames(Styles.item,className)}>
			<span>{label}</span> 
			<Button.Group className={Styles.controls}>
				<Button size='mini' compact 
					content='Edit' onClick={this.onEdit} />
				<Button size='mini' color='red' compact 
					content='Delete' onClick={this.onDelete} />
			</Button.Group>
		</div>)
	}
}

ListItem.propTypes = {
	className : PropTypes.string,
	label : PropTypes.string.isRequired
}

class EditItem extends Component{

	state = {
		changes : null
	}

	componentWillReceiveProps = ( props ) => {
		if( !_.isEqual( props.data, this.props.data ) ){
			this.setState({changes : null});
		}
	}

	onSave = () => {
		this.props.onSave( _.merge({},this.props.data,this.state.changes) );
	}

	onChange = ( evt, data ) => {
		const {value,name} = data;
		this.setState({
			changes : _.merge( this.state.changes || {}, {[name]:value} )
		});
	}

	render(){
		const {data,stations,onSave,onClose} = this.props;
		const {changes} = this.state;
		const hasChanges = _.size( _.keys(changes) ) > 0 ? true : false;

		const getValue = (id) => getValueFromSources(id, changes, data);
		
		return <div
		className={Styles.modal}
		open={true}
		>
		<div className={Styles.content}>
			<Form.Input className={Styles.input} name={'name'} value={getValue('name')} onChange={this.onChange} />
			<JourneyEditor
				className={Styles.map}
				stations={_.map(stations, item => item.position)} 
				points={getValue('points')} 
				onPointsChange={( points ) => {
					this.onChange( null, {name:'points',value:points} );
				}} />
			{hasChanges && <Button disabled={!hasChanges} className={Styles.save} color='green' onClick={this.onSave} content='Save' /> }
		</div>
		</div>
	}
}

EditItem.propTypes = {
	onClose : PropTypes.func,
	onSave : PropTypes.func
}

