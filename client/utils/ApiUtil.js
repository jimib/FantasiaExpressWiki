export function apiGet( url, data ){
	return _fetch( 'get', url, data );
}

export function apiPost( url, data ){
	return _fetch( 'post', url, data );
}

export function apiPut( url, data ){
	return _fetch( 'put', url, data );
}

export function apiDelete( url, data ){
	return _fetch( 'delete', url, data );
}

function _fetch( method, url, data ){
	return fetch( url, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin',
		method: method,
		body: JSON.stringify( data ),
	})
	.then( result => result.json() )
	.then( body => {
		switch( body.status ){
			case 'ok':
				return body.result;
			break;
			case 'error':
				throw new Error( body.error || 'Unknown Error');
			break;
			default:
				throw new Error( 'Unexpected response format');
			break;
		}
	} )
}