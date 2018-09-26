import PropTypes from "prop-types";
import React, { Component } from 'react';
import util from 'util';

import _ from 'lodash';

import Styles from "./Guide.styl";

const DEFAULT_GUIDE_STATE = {
	width : 100,
	height : 100,
	opacity : 0.5,
	overlay : true,
	guides : true,
	mode : 'normal'
};

class Guide extends Component {
	

	constructor(props){
		super( props );

		this.state = getStorage('guide') ||  DEFAULT_GUIDE_STATE;
	}

	componentDidMount(){
		this.guideImage.onload = () => {
			this.setState({
				width : this.guideImage.width,
				height : this.guideImage.height
			});
		};
		
		this.container.oncontextmenu = function(evt) {
			evt.preventDefault();
		};
	}
	
	componentWillUnmount(){
		this.guideImage.onload = null;
	}

	componentWillUpdate( props, state ){
		setStorage('guide', state);
	}

	onChange = ( evt ) =>{
		const {target} = evt;
		const name = target.getAttribute('name');
		const type = target.getAttribute('type');
		
		let value = evt.target.value;
		
		switch( type ){
			case 'checkbox':
				value = target.checked; 
			break;
			case 'number':
				value = Number(value); 
			break;
		}

		this.setState({
			[name] : value
		});
	}
	
	onComponentChange = ( name, value ) => {
		this.setState({
			[name] : value
		});
	}

	render(){
		let {src,children} = this.props;
		let {width,height,opacity,overlay,guides,scale,mode} = this.state;

		opacity = util.isNumber( opacity ) ? opacity : 1;
		scale = util.isNumber( scale ) ? scale : 1;

		return <div ref={ref=>this.container=ref} className={Styles.container} style={{width:width,height:height,transform:`scale(${scale*100}%)`}}>
			<div className={Styles.controls}>
				<div className={Styles.control}>
					<label htmlFor={Styles.guides}>Guides:</label>
					<input name='guides' type='checkbox' checked={guides} onChange={this.onChange} />
				</div>
				<div className={Styles.control}>
					<label htmlFor='scale'>Scale:</label>
					<Slider name='scale' minimum={0.1} value={scale} onChange={this.onComponentChange} />
				</div>
				<div className={Styles.control}>
					<label htmlFor={Styles.overlay}>Overlay:</label>
					<input name='overlay' type='checkbox' checked={overlay} onChange={this.onChange} />
				</div>
				<div className={Styles.control}>
					<label htmlFor='opacity'>Opacity:</label>
					<Slider name='opacity' disabled={!overlay} value={overlay?opacity:1} onChange={overlay?this.onComponentChange:null} />
				</div>
				<div className={Styles.control}>
					<label htmlFor='mode'>Mode:</label>
					<select name='mode' onChange={this.onChange} value={mode}>
						<option value='normal'>normal</option>
						<option value='exclusion'>exclusion</option>
						<option value='difference'>difference</option>
						<option value='multiply'>multiply</option>
					</select>
				</div>
			</div>
			<div className={Styles.content} style={{width:width,height:height,transform:`scale(${scale})`}}>
				{children}
				<img ref={ref=>this.guideImage = ref} className={Styles.overlay} src={src} style={{left:overlay?'0px':`${width}px`,opacity:(overlay?opacity:1),mixBlendMode:mode}} />
				{guides && <div className={Styles.guides} /> }
			</div>
		</div>
	}
}

Guide.propTypes = {
	src: PropTypes.string
};
export { Guide, Styles as GuideStyles };


class Slider extends Component{
	constructor( props ){
		super( props );

		this.state = {
			dragStartX : null,
			dragStartValue : null
		}
	}

	onDragEvent = ( evt ) => {
		let {minimum,value} = this.props;
		let {dragStartX,dragStartValue} = this.state;

		minimum = minimum ? minimum : 0.1;

		const dragX = evt.pageX || (evt.touches[0] || {}).pageX;
		
		switch( evt.type ){
			case 'mousedown':
			case 'touchstart':
				//bind listeners
				['mousemove','mouseup','touchmove','touchend'].forEach( type => {
					document.addEventListener( type, this.onDragEvent);
				});

				//make note of the start position
				this.setState({
					dragStartX : dragX,
					dragStartValue : value
				});
			case 'mousemove':
			case 'touchmove':
				if( util.isNumber( dragStartX ) && util.isNumber( dragStartValue ) ){
					//calculate how far we have moved
					const diffX = dragX - dragStartX;
					const width = this.content.offsetWidth;
					//how does this relate to the change in value
					const ivalue = Math.max( minimum, Math.min( 1, dragStartValue + diffX / width ) );
					//notify the parent of the change in value
					this.props.onChange( this.props.name, ivalue );
				}
			break;
			case 'mouseup':
			case 'touchend':
				//unbind listeners
				console.log('unbind listeners');
				['mousemove','mouseup','touchmove','touchend'].forEach( type => {
					document.removeEventListener( type, this.onDragEvent);
				});

				//reset the state
				this.setState({
					dragStartX : null,
					dragStartValue : null
				});
			break;
		}
	}

	render(){
		let {value,disabled} = this.props;
		
		value = disabled ? 0 : value;
		
		return <div ref={ref=>this.container=ref} 
			className={ClassNames(Styles.slider,disabled?Styles.disabled:Styles.enabled)} 
			onMouseDown={this.onDragEvent} onTouchStart={this.onDragEvent}>
			<div ref={ref=>this.content=ref} className={Styles.content}>
				<div className={Styles.background} style={{width:`${value*100}%`}} />
				<div className={Styles.button} style={{left:`${value*100}%`}} />
			</div>	
		</div>	
	}
}


function setStorage(id, value) {
	localStorage.setItem(id, JSON.stringify(value));
}

function getStorage(id) {
	try {
		return JSON.parse(localStorage.getItem(id));
	} catch (err) {

	}

	return null;
}

export function ClassNames() {
	return _.filter(arguments, className => {
		return className ? true : false;
	}).join(' ');
}
