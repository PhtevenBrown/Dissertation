"use strict";

window.addEventListener("load", init);
var map;

function init() {
    map = loadMap();
}

function loadMap() {
    var lon = -4.2436;
    var lat = 55.8609;

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: 20
        })
    });
    return map;
}
