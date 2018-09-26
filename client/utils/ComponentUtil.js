import _ from 'lodash';

export function ClassNames() {
	return _.filter(arguments, className => {
		return className ? true : false;
	}).join(' ');
}