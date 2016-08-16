var angular = require('angular');

require('../state/state');
require('../leaflet-map/leaflet-map');
angular.module('widgets', [
  'state',
  'leaflet-map'
])
  .directive('datePicker', require('./date-picker-directive'))
  .directive('rainMapWidget', require('./rain-map-widget-directive'));
