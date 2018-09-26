import _ from 'lodash';
import util from 'util';
//HELPER

export function Update( state, props ){
	console.assert( util.isObject( state ), 'Update expects an Object' );
	return _.assign( state, props );
}

export function UpdateProperty( state, prop, value ){
	console.assert( util.isObject( state ), 'UpdateProperty expects an Object' );
	state[prop] = value;
	return state;
}

export function RemoveItem( items, item, propId = 'id' ){
	console.assert( util.isArray( items ), 'RemoveItem expects an Array' );
	return _.without( items, GetItemReference( items, item, propId ) );
}

export function AddItem( items, item, propId = 'id' ){
	console.assert( util.isArray( items ), 'AddItem expects an Array' );
	return [
		..._.without(items, GetItemReference( items, item, propId )),
		item
	];
}

export function UpdateItem( items, item, propId = 'id' ){
	console.assert( util.isArray( items ), 'UpdateItem expects an Array' );
	return SwapItems( items, GetItemReference( items, item, propId ), item ); 
}

export function GetItemReference( items, item, propId = 'id' ){
	console.assert( util.isArray( items ), 'GetItemReference expects an Array' );
	return _.find( items, _.pick( item, propId ) );
}

export function SwapItems( items, itemA, itemB ){
	console.assert( util.isArray( items ), 'SwapItems expects an Array' );
	//get the index of the original basket
	let index = _.indexOf( items, itemA );
	if( index == -1 ){
		console.warn('Item could not be swapped as it doesn\'t exist');
	}else{
		//this removes the items we want and pushes the new item
		//DON'T USE THE RETURN VALUE - THAT TELLS US WHAT WAS DELETED
		items.splice( index, 1, itemB );
	}

	return items;
}

