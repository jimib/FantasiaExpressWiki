const REGEXP_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail( email ){
	return new Promise( ( resolve, reject ) => {
		REGEXP_EMAIL.test( String(email).toLowerCase() ) ? resolve( email ) : reject(`Unexpected email format`);
	} );
}