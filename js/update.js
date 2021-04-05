"use strict";

window.addEventListener("load", main);

async function main() {
	var coordinates, latitude, longitude, prevLat, prevLon;
	var index = 1;
	var prevIndex = 1;

	while (true) {
		coordinates = getCoordinates(index);
		latitude = coordinates.latitude;
		longitude = coordinates.longitude;

		if(validateData(latitude, longitude)) {
			removeOldMarker(prevIndex);
			drawRoute(latitude, longitude, prevLat, prevLon);
			plotMarker(latitude, longitude, index);

			prevIndex = index;
			prevLat = latitude;
			prevLon = longitude;
			centerView(latitude, longitude);
		}
		index = coordinates.nextPos;
		await sleep(1);
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getCoordinates(index) {
	var lat = null;
	var lon = null;
	$.ajax({
		async: false,
		type: 'POST',
		url: 'fetchCoordinates.php',
		data: {value: index},
		dataType: 'json',
		success: function (data) {
			lat = data.latitude.toString();
			lon = data.longitude.toString();
			index++;
		}
	});
	return {
		nextPos: index,
		latitude: lat,
		longitude: lon
	};
}

function validateData(lat, lon) {
	if(isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 ||
		lon < -180 || lon > 180 || lat === null || lon === null) {
		return false;
	}
	return true;
}

function removeOldMarker(prevIndex) {
	map.getLayers().getArray()
		.filter(layer => layer.get('id') === 'marker-'+prevIndex)
		.forEach(layer => map.removeLayer(layer));
}

function plotMarker(lat, lon, id) {
	var layer = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [
				new ol.Feature({
					geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
				})
			]
		})
	});

	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			anchor: [0.5, 1],
			width: '5px',
			height: '5px',
			src: "../images/marker.png",
			scale: 0.1
		}))
	});
	layer.setStyle(iconStyle);
	layer.set('id', 'marker-'+id);
	map.addLayer(layer);
}

function drawRoute(lat, lon, prevLat, prevLon) {
	var p1 = ol.proj.transform([prevLon, prevLat], 'EPSG:4326', 'EPSG:3857');
	var p2 = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');

	var vector = new ol.source.Vector({});
	vector.addFeature(new ol.Feature({geometry: new ol.geom.LineString([p1, p2])}));

	var outline = new ol.layer.Vector({
		source: vector,
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({color: '#F0F', width: 5})
		})
	});
	var line = new ol.layer.Vector({
		source: vector,
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({color: '#FFF', width: 2})
		})
	});

	map.addLayer(outline);
	map.addLayer(line);
}

function centerView(lat, lon) {
	map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
}