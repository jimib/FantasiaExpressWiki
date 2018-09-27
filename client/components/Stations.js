import { hot } from 'react-hot-loader';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames, getValueFromSources } from '@pixel-inspiration/react-libs/common';

import Styles from './css/Stations.styl';

import {JourneyEditor} from '@meyouandus/wikiskin';
import {Modal,Header,Button,Icon,Form} from 'semantic-ui-react';

const DEFAULT_POSITION = {
	lat: 51.531109166116295,
	lng: -0.125550741249441
}
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
		var {className,items,itemSelected,onItemSelect,onItemUnselect,onItemUpdate,onItemRemove,onItemCreate} = this.props;
		return (<div className={ClassNames(Styles.container,className)}>
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
				<Button floated='right' icon='add' content='Station' onClick={onItemCreate} />
			</div>

			{itemSelected ? <EditItem data={itemSelected} onClose={onItemUnselect} onSave={onItemUpdate} /> : null}
		</div>)
	}
}

Stations.propTypes = {
	className : PropTypes.string,
	//data : PropTypes.object.isRequired,
	//items : PropTypes.array.isRequired,
	onItemSelect : PropTypes.func.isRequired,
	onItemUpdate : PropTypes.func.isRequired,
	onItemRemove : PropTypes.func.isRequired
}

Stations.defaultProps = {
	//onClick : () => console.warn('onClick has not been implemented'),
}

export default hot(module)(Stations);
export {Stations,Styles as StationsStyles};

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
		const {data,onSave,onClose} = this.props;
		const {changes} = this.state;
		const hasChanges = _.size( _.keys(changes) ) > 0 ? true : false;

		const getValue = (id) => getValueFromSources(id, changes, data);
		
		return <Modal
		className={Styles.modal}
		open={true}
		onClose={onClose}
		basic
		size='small'
		>
		<Modal.Content className={Styles.content}>
			<Form.Input className={Styles.input} name={'name'} value={getValue('name')} onChange={this.onChange} />
			<JourneyEditor
				className={Styles.map}
				center={data.position||DEFAULT_POSITION}
				stations={[getValue('position')||DEFAULT_POSITION]} 
				onStationsChange={( stations ) => {
					this.onChange( null, {name:'position',value:_.first( stations )} );
				}} />
			{hasChanges && <Button disabled={!hasChanges} className={Styles.save} color='green' onClick={this.onSave} content='Save' /> }
		</Modal.Content>
		</Modal>
	}
}

EditItem.propTypes = {
	onClose : PropTypes.func,
	onSave : PropTypes.func
}

