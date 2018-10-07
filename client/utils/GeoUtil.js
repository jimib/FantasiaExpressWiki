export function distanceBetweenPnts(pnt1, pnt2) {

	let lat1 = pnt1.lat; 
	let lng1 = pnt1.lng; 
	let lat2 = pnt2.lat; 
	let lng2 = pnt2.lng; 

	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lng1-lng2;
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	if (dist > 1) {
		dist = 1;
	}
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1.609344 * 1000;
	return dist
}

export function angleBetweenPnts(pnt1, pnt2) {

	let lat1 = pnt1.lat; 
	let lng1 = pnt1.lng; 
	let lat2 = pnt2.lat; 
	let lng2 = pnt2.lng; 

	let theta = (lng2 - lng1);

    let y = Math.sin(theta) * Math.cos(lat2);
    let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(theta);

    let angle = Math.atan2(y, x);

    angle = 180 * angle / Math.PI;
    angle = (angle + 360) % 360;
    angle = 360 - angle; // count degrees counter-clockwise - remove to make clockwise

	return angle;
}