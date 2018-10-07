import { hot } from 'react-hot-loader';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames, getValueFromSources } from '@pixel-inspiration/react-libs/common';

import Styles from './css/Events.styl';

import {MapEditorOverlayPointsComponent} from '@meyouandus/wikiskin';
import {Modal,Header,Button,Icon,Form} from 'semantic-ui-react';

class Events extends PixelComponent{
	
	/**
	 * @memberOf Events
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
	 * @memberOf Events
	 * @function onClick
	 * @prop {Event}
	 * @returns null
	 */
	onClick = (evt) => {
	}

	/**
	 * @memberOf Events
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		var {className,map,items,itemSelected,onItemSelect,onItemUnselect,onItemUpdate,onItemRemove,onItemCreate} = this.props;
		return (<MapEditorOverlayPointsComponent map={map} color='blue' items={items} changeOnDrag={false} onChange={( item, items ) => {
			onItemUpdate( item );
		}} />)
	}
}

Events.propTypes = {
	className : PropTypes.string,
	//data : PropTypes.object.isRequired,
	//items : PropTypes.array.isRequired,
	onItemSelect : PropTypes.func.isRequired,
	onItemUpdate : PropTypes.func.isRequired,
	onItemRemove : PropTypes.func.isRequired
}

Events.defaultProps = {
	//onClick : () => console.warn('onClick has not been implemented'),
}

export default hot(module)(Events);
export {Events,Styles as EventsStyles};

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
		const {data,route,onSave,onClose} = this.props;
		const {changes} = this.state;
		const hasChanges = _.size( _.keys(changes) ) > 0 ? true : false;

		const getValue = (id) => getValueFromSources(id, changes, data);
		
		return <div
		className={Styles.modal}
		>
			<div className={Styles.content}>
				<Form.Input className={Styles.input} name={'name'} value={getValue('name')} onChange={this.onChange} />
				{<Button disabled={!hasChanges} className={Styles.save} color='green' onClick={this.onSave} content='Save' />}
				<JourneyEditor
					className={Styles.map}
					center={data.position||DEFAULT_POSITION}
					stations={[{position:getValue('position')||DEFAULT_POSITION}]}
					onEventsChange={( stations ) => {
						this.onChange( null, {name:'position',value:_.first( stations )} );
					}} />
			</div>
		</div>
	}
}

EditItem.propTypes = {
	onClose : PropTypes.func,
	onSave : PropTypes.func
}

