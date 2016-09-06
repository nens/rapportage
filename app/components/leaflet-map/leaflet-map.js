var angular = require('angular');

angular.module('leaflet-map', [])
  .directive('leafletMap', require('./leaflet-map-directive'))
  .directive('mapLegend', require('./map-legend-directive'));
