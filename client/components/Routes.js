import React, {Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import { PixelComponent } from '@pixel-inspiration/react-libs/components';
import { ClassNames, getValueFromSources, getInputEventChanges } from '@pixel-inspiration/react-libs/common';
import { hot } from 'react-hot-loader';

import Styles from './css/Routes.styl';

import {MapEditorOverlayPointsComponent,MapEditorLineCurveComponent} from '@meyouandus/wikiskin';
import {AXIS_LAT_LNG,closestPointOnBezierCurve, pointsToBezier, getPointAtLengthOnBezierCurve, curveToSvgPath} from '@meyouandus/wikiskin/src/utils/CurveUtil';
import {Modal,Header,Button,Icon,Form} from 'semantic-ui-react';
import { Style } from 'glamorous';
import Compass from './Compass';

const STEP_SIZE = 0.000005;

class Routes extends PixelComponent{
	
	state = {
		train : {
			lat: 51.53860092163086,
			lng: -0.14806696772575378
		},
		distance : 0,
		speed : 1
	}

	
	componentDidMount(){
		this.props.onMount();
		this.interval = setInterval( () => {
			//update the position based on the speed
			const {speed,train,distance} = this.state;
			const {itemSelected} = this.props;
			if( speed != 0 && itemSelected ){
		
				//update the train position - find it's current position on the curve
				const curve = pointsToBezier( itemSelected.points, AXIS_LAT_LNG );
				const svg = curveToSvgPath( curve );
				const iDistance = distance + speed * STEP_SIZE;
				const pnt = svg.path.pointAt( iDistance );

				//const position = getPointAtLengthOnBezierCurve( curve, distanceTravelled + speed * 0.00001 );
				//console.log( position, distanceTravelled, section,segment );
				if( pnt ){
					this.setState({
						train : {
							[AXIS_LAT_LNG.xAxis] : pnt.x,
							[AXIS_LAT_LNG.yAxis] : pnt.y
						},
						distance : iDistance
					});
				}

				svg.remove();
				//from our speed we know

			}
		}, 10 );

		this.updateRoute();
	}

	componentWillReceiveProps = ( props ) => {
		const a = props.itemSelected ? props.itemSelected.points : null;
		const b = this.props.itemSelected ? this.props.itemSelected.points : null;
		if( a != b ){
			this.updateRoute( props );
		}
	}
	
	componentWillUnmount(){
		this.props.onUnmount();
		clearInterval( this.interval );
		this.svg.remove();
	}
	
	updateRoute = ( props = this.props ) => {
		console.log('updateRoute');
		if( this.svg ){
			this.svg.remove();
			this.svg = null;
		}

		const {itemSelected} = props;
		
		if( itemSelected ){
			this.svg = curveToSvgPath( pointsToBezier( itemSelected.points, AXIS_LAT_LNG ), 'route' );
		}
		
		this.updateTrainPosition();
	}

	onInputChange = ( evt ) => {
		this.setState( getInputEventChanges( evt ) );
	}

	updateTrainPosition = () => {
		//take the train position and pin it to the track
		const curve = pointsToBezier( this.props.itemSelected.points, AXIS_LAT_LNG );
		const trainOnRoute = curve ? closestPointOnBezierCurve( curve, this.state.train, AXIS_LAT_LNG ) : null;

		if( trainOnRoute ){
			const {section,segment} = trainOnRoute;
			const distance = section.pntA.distance + segment * section.pntB.length;
			this.setState({train:trainOnRoute,distance});
		}
	}

	/**
	 * @memberOf Routes
	 * @function render
	 * @returns {JSXElement}
	 */
	render(props){
		const {className,map,disabled,itemSelected,onItemSelect,onItemUnselect,onItemUpdate,onItemRemove,onItemCreate} = this.props;
		const {speed,distance} = this.state;

		const points = itemSelected ? itemSelected.points : null;

		let train = null;
		let rotation = 0;
		
		if( this.svg ){
			const dir = speed > 0 ? 1 : -1;
			const a = this.svg.path.pointAt( Math.max( 0, distance - 10 * dir * STEP_SIZE ) );
			const b = this.svg.path.pointAt( Math.max( 0, distance + 10 * dir * STEP_SIZE ) );
			//console.log(a,b);
			rotation = -(180 * Math.atan2(a.y - b.y,a.x - b.x) / Math.PI) - 90;
			const t = this.svg.path.pointAt( distance );
			train = {
				[AXIS_LAT_LNG.xAxis] : t.x,
				[AXIS_LAT_LNG.yAxis] : t.y
			}
		}
		
		return (<Fragment>
			{!disabled && <div className={Styles.controls}>
				<div className={Styles.control}>
					<label>{speed}</label>
					<input type={'range'} name={'speed'} min={-100} max={100} step={10} data-type='number' value={speed} onChange={this.onInputChange} />
					<button onClick={() => {
						this.setState({speed:0});
					}}>reset</button>
				</div>
			</div>}
			{points && <MapEditorLineCurveComponent disabled={disabled} map={map} color='red' items={points} changeOnDrag={false} />}
			{points && <MapEditorOverlayPointsComponent disabled={disabled} map={map} color='red' items={points} changeOnDrag={false} onChange={( point, points ) => {
				const itemUpdate = _.assign({},itemSelected,{points});
				onItemUpdate( itemUpdate );
			}} onChangeComplete={() => {
				//update the train position
				this.updateTrainPosition();
			}} />}

			{!disabled && train && <MapEditorOverlayPointsComponent map={map} color='purple' items={[train]} itemSelected={train} onChange={(item) => {
				this.setState({train:item})
			}} onChangeComplete={(item) => {
				this.updateTrainPosition();
			}} />}

			{train && <Compass className={Styles.compass} direction={rotation} />}
		</Fragment>)
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

