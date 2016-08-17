var angular = require('angular');

require('../state/state');
require('../leaflet-map/leaflet-map');
require('../api/api');
angular.module('widgets', [
  'state',
  'leaflet-map',
  'api',
])
  .directive('datePicker', require('./date-picker-directive'))
  .directive('rainMapWidget', require('./rain-map-widget-directive'))
  .directive('rainGraph', require('./rain-graph-directive'))
  .directive('rainRecurrenceTime', require('./rain-recurrence-directive'));
