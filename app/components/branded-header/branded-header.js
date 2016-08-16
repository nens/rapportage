var angular = require('angular');

require('../state/state');
angular.module('brandedHeader', [
  'state'
])
  .directive('brandedHeader', require('./branded-header-directive'));
