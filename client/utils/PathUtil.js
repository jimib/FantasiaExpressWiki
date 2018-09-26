import _ from 'lodash';

export function createRoutePath( path, parameters ){
	let output = path.toString();

	_.each( parameters, (value,id) => {
		output = output.replace( `:${id}`, value );
	} )

	return output;
}